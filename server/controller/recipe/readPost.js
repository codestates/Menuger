const { Recipe } = require('../../models/recipe');
const { isValidObjectId } = require('mongoose');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: '해당 id는 유효하지 않습니다.' });
    }

    const recipe = await Recipe.findOne({ _id: id });

    return res.status(200).send({ recipe });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
