const { User } = require('../../models/user');
const { Recipe } = require('../../models/recipe');
const { verifyAccessToken } = require('../utils/jwt');
const {
  isValidObjectId,
  Types: { ObjectId },
} = require('mongoose');

module.exports = async (req, res) => {
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

    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: '해당 게시물id는 유효하지 않습니다.' });
    }

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe.user._id.equals(ObjectId(payload))) {
      return res.status(400).send({ message: '게시물의 작성자만 수정할 수 있습니다' });
    }

    const { title = recipe.title, content = recipe.content, hashtags = recipe.hashtags } = req.body;

    recipe.title = title;
    recipe.content = content;
    recipe.hashtags = hashtags;

    await recipe.save();
    return res.status(200).send({ message: '해당 레시피를 수정하였습니다.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
