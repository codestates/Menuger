const { Recipe } = require('../../models/recipe');

module.exports = async (req, res) => {
  try {
    let { page = 1, sort = -1, hashtag, user, title, like, comment } = req.query;

    let recipes;

    page = parseInt(page);
    sort = parseInt(sort);

    recipes = await Recipe.find({
      ...(title ? { title: new RegExp(title) } : null),
      ...(hashtag ? { hashtags: hashtag } : null),
      ...(user ? { 'user.nickname': user } : null),
    })
      .sort({
        ...(like ? { likesCount: like } : null),
        ...(comment ? { commentsCount: comment } : null),
        ...{ createdAt: sort },
      })
      .skip((page - 1) * 12)
      .limit(12)
      .map(recipes => {
        return recipes.map(recipe => {
          /* eslint-disable-next-line no-unused-vars */
          const { content, ...list } = recipe._doc;
          return list;
        });
      });
    return res.status(200).send({ recipes });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
