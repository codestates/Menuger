const { v4: uuid } = require('uuid');
const mime = require('mime-types');
const { getSignedUrl } = require('../../aws');

module.exports = async (req, res) => {
  try {
    // TOOD: 로컬 로그인 / 소셜 로그인에 대한 검증
    const { contentTypes } = req.body;
    if (!Array.isArray(contentTypes)) throw new Error('invalid contentTypes');

    const presignedData = await Promise.all(
      contentTypes.map(async contentType => {
        const imageKey = `${uuid()}.${mime.extension(contentType)}`;
        const key = `raw/${imageKey}`;
        const presigned = await getSignedUrl({ key });
        return { imageKey, presigned };
      }),
    );
    res.status(200).json({ data: presignedData, message: 'presignedUrl 생성 완료' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
