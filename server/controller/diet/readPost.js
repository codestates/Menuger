const { Diet } = require('../../models/diet');
const { isValidObjectId } = require('mongoose');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: '해당 id는 유효하지 않습니다.' });
    }

    const diet = await Diet.findOne({ _id: id });

    if (!diet) {
      return res.status(400).send({ message: '존재하지 않는 게시물입니다.' });
    }

    return res.status(200).send({ diet });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
