const { Diet } = require('../../models/diet');
const { isValidObjectId } = require('mongoose');

module.exports = {
  get: async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        res.status(400).send({ message: '해당 id는 유효하지 않습니다.' });
      }

      const diet = await Diet.findOne({ _id: id });

      return res.status(200).send({ diet });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
};
