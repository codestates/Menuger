const { Recipe } = require('../../models/recipe');

module.exports = async (req, res) => {
  try {
    let { page = 1, sort = -1, hashtag, user, title } = req.query;

    if (!hashtag && !user && !title) {
      const recipes = await Recipe.find({})
        .sort({ createdAt: sort })
        .skip((page - 1) * 8)
        .limit(8);
      return res.status(200).send({ recipes });
    }
    page = parseInt(page);
    sort = parseInt(sort);

    let recipes;
    if (title) {
      recipes = await Recipe.find({ title: new RegExp(title) })
        .sort({ createdAt: sort })
        .skip((page - 1) * 8)
        .limit(8);
    } else if (hashtag) {
      recipes = await Recipe.find({ hashtags: hashtag })
        .sort({ createdAt: sort })
        .skip((page - 1) * 8)
        .limit(8);
    } else {
      recipes = await Recipe.find({ 'user.nickname': user })
        .sort({ createdAt: sort })
        .skip((page - 1) * 8)
        .limit(8);
    }

    return res.status(200).send({ recipes });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
