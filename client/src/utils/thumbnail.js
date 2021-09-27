const extractThumbnail = str => {
  const regex = /<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/;
  const thumbnail = regex.exec(str);

  return thumbnail ? thumbnail[1] : null;
};

export default extractThumbnail;
