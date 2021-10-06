const getQueryStrByInput = input => {
  if (input[0] === '#') {
    return `hashtag=${input.slice(1)}`;
  } else if (input[0] === '@') {
    return `user=${input.slice(1)}`;
  } else {
    return `title=${input}`;
  }
};

export default getQueryStrByInput;
