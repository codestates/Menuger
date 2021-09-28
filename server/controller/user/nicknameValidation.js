const { User } = require('../../models/user');

module.exports = (req, res) => {
  try {
    const { nickname } = req.params;

    User.findOne({ nickname }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (user) {
        return res.status(400).send({ message: '이미 존재하는 닉네임입니다.' });
      } else {
        return res.status(200).send({ message: '사용가능한 닉네임입니다.' });
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
