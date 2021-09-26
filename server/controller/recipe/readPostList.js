const { Recipe } = require('../../models/recipe');

module.exports = async (req, res) => {
  try {
    let { page = 1, sort = -1 } = req.query;
    page = parseInt(page);
    sort = parseInt(sort);
    const recipes = await Recipe.find({})
      .sort({ updatedAt: sort })
      .skip((page - 1) * 8)
      .limit(8);

    return res.status(200).send({ recipes });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
