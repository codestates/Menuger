const { User } = require('../../models/user');
const { Recipe } = require('../../models/recipe');
const { Diet } = require('../../models/diet');
const { Comment } = require('../../models/comment');
const { Like } = require('../../models/like');
const { Bookmark } = require('../../models/bookmark');
const { verifyAccessToken } = require('../utils/jwt');
const {
  Types: { ObjectId },
} = require('mongoose');

module.exports = {
  get: (req, res) => {
    try {
      const { nickname } = req.params;
      if (!nickname) {
        return res.status(400).send({ message: '닉네임을 입력받지 않았습니다.' });
      }

      User.findOne({ nickname }, async (err, user) => {
        if (err) {
          return res.status(400).send(err);
        }

        if (!user) {
          return res.status(400).send({ message: '존재하지 않는 유저입니다.' });
        }

        const { email, nickname, image_url = '', subscribes } = user;

        const [likes, bookmarks] = await Promise.all([
          Like.find({ user: user._id }),
          Bookmark.find({ user: user._id }),
        ]);

        const subscribeUsers = await Promise.all(
          subscribes.map(async subscribe => {
            const user = await User.findOne({ _id: ObjectId(subscribe) });
            const userInfo = {
              email: user.email,
              nickname: user.nickname,
              image_url: user.image_url,
            };
            return userInfo;
          }),
        );

        const likePosts = await Promise.all(
          likes.map(async like => {
            if (like.postType === 'recipe') {
              const post = await Recipe.findOne({ _id: ObjectId(like.post) });
              const postInfo = {
                user: post.user,
                title: post.title,
                thumbnail_url: post.thumbnail_url,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              };
              return postInfo;
            } else {
              const post = await Diet.findOne({ _id: ObjectId(like.post) });
              const postInfo = {
                user: post.user,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              };
              return postInfo;
            }
          }),
        );

        const bookmarkPosts = await Promise.all(
          bookmarks.map(async bookmark => {
            if (bookmark.postType === 'recipe') {
              const post = await Recipe.findOne({ _id: ObjectId(bookmark.post) });
              const postInfo = {
                user: post.user,
                title: post.title,
                thumbnail_url: post.thumbnail_url,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              };
              return postInfo;
            } else {
              const post = await Diet.findOne({ _id: ObjectId(bookmark.post) });
              const postInfo = {
                user: post.user,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              };
              return postInfo;
            }
          }),
        );

        return res
          .status(200)
          .send({ nickname, email, image_url, likePosts, bookmarkPosts, subscribeUsers });
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  patch: async (req, res) => {
    try {
      let payload;
      if (req.cookies.kakaoAccessToken) {
        const kakaoUser = await User.findOne({ refreshToken: req.cookies.kakaoRefreshToken });
        payload = kakaoUser._id;
      } else {
        payload = verifyAccessToken(req.cookies.accessToken).payload;
        if (!payload) {
          return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
        }
      }

      const user = await User.findById(ObjectId(payload));

      if (!user) {
        return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
      }

      const {
        password = user.password,
        image_url = user.image_url,
        nickname = user.nickname,
      } = req.body;

      user.password = password;
      user.image_url = image_url;
      user.nickname = nickname;

      await Promise.all([
        Recipe.updateMany(
          { 'user._id': ObjectId(payload) },
          {
            'user.nickname': nickname,
            'user.image_url': image_url,
          },
        ),
        Diet.updateMany(
          { 'user._id': ObjectId(payload) },
          {
            'user.nickname': nickname,
            'user.image_url': image_url,
          },
        ),
        Comment.updateMany(
          { 'user._id': ObjectId(payload) },
          {
            'user.nickname': nickname,
            'user.image_url': image_url,
          },
        ),
      ]);
      await user.save();

      return res.status(200).send({ message: '유저 정보가 수정되었습니다.' });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  interaction: async (req, res) => {
    try {
      let { nickname, postType } = req.params;
      postType = postType.slice(0, -1);
      if (!nickname) {
        return res.status(400).send({ message: '닉네임을 입력받지 않았습니다.' });
      }

      User.findOne({ nickname }, async (err, user) => {
        if (err) {
          return res.status(400).send(err);
        }

        if (!user) {
          return res.status(400).send({ message: '존재하지 않는 유저입니다.' });
        }

        const { subscribes } = user;

        const [likes, bookmarks] = await Promise.all([
          Like.find({ user: user._id, postType }),
          Bookmark.find({ user: user._id, postType }),
        ]);

        const likeIds = await Promise.all(
          likes.map(async like => {
            if (like.postType === postType) {
              return like.post;
            }
          }),
        );

        const bookmarkIds = await Promise.all(
          bookmarks.map(async bookmark => {
            if (bookmark.postType === postType) {
              return bookmark.post;
            }
          }),
        );

        return res.status(200).send({ likeIds, bookmarkIds, subscribes });
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
};
