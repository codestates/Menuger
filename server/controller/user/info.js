const { User } = require('../../models/user');

module.exports = {
  get: (req, res) => {
    const { nickname } = req.params;
    if (!nickname) {
      res.status(400).send({ message: '닉네임을 입력받지 않았습니다.' });
    }

    User.findOne({ nickname }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }

      if (!user) {
        return res.status(400).send({ message: '존재하지 않는 유저입니다.' });
      }

      const { email, nickname, image_url = '' } = user;

      res.status(200).send({ nickname, email, image_url });
    });
  },
};
