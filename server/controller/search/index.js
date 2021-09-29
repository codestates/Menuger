module.exports = (req, res) => {
  try {
    const { postType, input } = req.body;
    if (postType === '레시피') {
      if (input[0] === '#') {
        return res.redirect(`/recipes?hashtag=${input.slice(1)}`);
      } else if (input[0] === '@') {
        return res.redirect(`/recipes?user=${input.slice(1)}`);
      } else {
        return res.redirect(`/recipes?title=${input}`);
      }
    } else {
      if (input[0] === '#') {
        return res.redirect(`/diets?hashtag=${input.slice(1)}`);
      } else if (input[0] === '@') {
        return res.redirect(`/diets?user=${input.slice(1)}`);
      } else {
        return res.redirect(`/diets?title=${input}`);
      }
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
