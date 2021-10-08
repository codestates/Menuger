const extractThumbnailKey = str => {
  const regex = /<img.+src=[\s\S][^\s]+/;
  const thumbnail = regex.exec(str);

  return thumbnail?.[0]
    .replace('<img src=', '')
    .replace(`${process.env.REACT_APP_S3_URL}/raw/`, '');
};

export default extractThumbnailKey;
