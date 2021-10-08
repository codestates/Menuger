const { Diet } = require('../../models/diet');

module.exports = async (req, res) => {
  try {
    let { page = 1, sort = -1, hashtag, user, title, like, comment } = req.query;

    let diets;

    page = parseInt(page);
    sort = parseInt(sort);

    if (like) {
      if (!hashtag && !user && !title) {
        const diets = await Diet.find({})
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
        return res.status(200).send({ diets });
      }

      if (title) {
        diets = await Diet.find({ title: new RegExp(title) })
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)

          .limit(12);
      } else if (hashtag) {
        diets = await Diet.find({ hashtags: hashtag })
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else {
        diets = await Diet.find({ 'user.nickname': user })
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      }
    } else if (comment) {
      if (!hashtag && !user && !title) {
        const diets = await Diet.find({})
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
        return res.status(200).send({ diets });
      }

      if (title) {
        diets = await Diet.find({ title: new RegExp(title) })
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else if (hashtag) {
        diets = await Diet.find({ hashtags: hashtag })
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else {
        diets = await Diet.find({ 'user.nickname': user })
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      }
    } else {
      if (!hashtag && !user && !title) {
        const diets = await Diet.find({})
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
        return res.status(200).send({ diets });
      }

      if (title) {
        diets = await Diet.find({ title: new RegExp(title) })
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else if (hashtag) {
        diets = await Diet.find({ hashtags: hashtag })
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else {
        diets = await Diet.find({ 'user.nickname': user })
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      }
    }
    return res.status(200).send({ diets });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
