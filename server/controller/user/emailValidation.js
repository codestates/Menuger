const { User } = require('../../models/user');

module.exports = (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: '이메일을 입력받지 않았습니다.' });
    }

    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (user) {
        return res.status(400).send({ message: '이미 존재하는 이메일입니다.' });
      } else {
        return res.status(200).send({ message: '사용가능한 이메일입니다.' });
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
