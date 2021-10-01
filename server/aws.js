const aws = require('aws-sdk');
const { ACCESS_KEY, SECRET_KEY } = process.env;
const { MB } = require('./controller/utils/size');

const s3 = new aws.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: 'ap-northeast-2',
});

const FILE_SIZE_LIMIT = 10;
const VALID_TIME = 300; // 5 min

const getSignedUrl = ({ key }) => {
  return new Promise((resolve, reject) => {
    s3.createPresignedPost(
      {
        Bucket: 'recipe-upload-image',
        Fields: { key },
        Expires: VALID_TIME,
        Conditions: [
          ['content-length-range', 0, FILE_SIZE_LIMIT * MB],
          ['starts-with', '$Content-Type', 'image/'],
        ],
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      },
    );
  });
};

module.exports = { s3, getSignedUrl };
