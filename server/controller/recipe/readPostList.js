const { Recipe } = require('../../models/recipe');

module.exports = async (req, res) => {
  try {
    let { page = 1, sort = -1, hashtag, user, title, like, comment } = req.query;

    let recipes;

    page = parseInt(page);
    sort = parseInt(sort);

    if (like) {
      if (!hashtag && !user && !title) {
        const recipes = await Recipe.find({})
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
        return res.status(200).send({ recipes });
      }

      if (title) {
        recipes = await Recipe.find({ title: new RegExp(title) })
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)

          .limit(12);
      } else if (hashtag) {
        recipes = await Recipe.find({ hashtags: hashtag })
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else {
        recipes = await Recipe.find({ 'user.nickname': user })
          .sort({ likesCount: like, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      }
    } else if (comment) {
      if (!hashtag && !user && !title) {
        const recipes = await Recipe.find({})
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
        return res.status(200).send({ recipes });
      }

      if (title) {
        recipes = await Recipe.find({ title: new RegExp(title) })
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else if (hashtag) {
        recipes = await Recipe.find({ hashtags: hashtag })
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else {
        recipes = await Recipe.find({ 'user.nickname': user })
          .sort({ commentsCount: comment, createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      }
    } else {
      if (!hashtag && !user && !title) {
        const recipes = await Recipe.find({})
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
        return res.status(200).send({ recipes });
      }

      if (title) {
        recipes = await Recipe.find({ title: new RegExp(title) })
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else if (hashtag) {
        recipes = await Recipe.find({ hashtags: hashtag })
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      } else {
        recipes = await Recipe.find({ 'user.nickname': user })
          .sort({ createdAt: sort })
          .skip((page - 1) * 12)
          .limit(12);
      }
    }
    return res.status(200).send({ recipes });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
