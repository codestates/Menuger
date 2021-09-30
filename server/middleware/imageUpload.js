const multer = require('multer');
const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const multerS3 = require('multer-s3');
const { s3 } = require('../aws');
const { MB } = require('../controller/utils/size');

const storage = multerS3({
  s3,
  bucket: 'recipe-upload-image',
  key: (req, file, cb) => cb(null, `raw/${uuid()}.${mime.extension(file.mimetype)}`),
});
const fileFilter = (req, file, cb) => {
  if (['image/png', 'image/jpeg'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('invalid file type.'), false);
  }
};
const limits = { fileSize: 5 * MB };
const upload = multer({ storage, fileFilter, limits });

module.exports = { upload };
