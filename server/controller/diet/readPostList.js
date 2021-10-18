const { Diet } = require('../../models/diet');

module.exports = async (req, res) => {
  try {
    let { page = 1, sort = -1, hashtag, user, title, like, comment } = req.query;

    let diets;

    page = parseInt(page);
    sort = parseInt(sort);

    diets = await Diet.find({
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
      .map(diets => {
        return diets.map(diet => {
          /* eslint-disable-next-line no-unused-vars */
          const { dietColumnList, subtitle, content, ...list } = diet._doc;
          return list;
        });
      });
    return res.status(200).send({ diets });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
