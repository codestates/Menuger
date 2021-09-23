const { User } = require('../../models/user');

module.exports = async (req, res) => {
  try {
    let { email, password, nickname } = req.body;
    if (!email) {
      return res.status(400).send({ message: '이메일을 입력받지 않았습니다.' });
    }
    if (!password) {
      return res.status(400).send({ message: '비밀번호를 입력받지 않았습니다.' });
    }
    if (!nickname) {
      return res.status(400).send({ message: '닉네임을 입력받지 않았습니다.' });
    }
    const user = new User(req.body);
    await user.save();
    return res.status(201).send({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};
