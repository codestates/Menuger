const regex = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: /(?=.*\d)(?=.*[a-z]).{8,}/, // 영어소문자, 숫자 포함 8자 이상의 비밀번호.
};

const validator = (type, str) => !!regex[type].exec(str);

export default validator;
