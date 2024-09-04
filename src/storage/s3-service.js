require("dotenv").config({ path: "../.env" });

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucket = process.env.AWS_S3_BUCKET_NAME;

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadToS3 = async (file) => {
  const filename = Date.now().toString() + "-" + file.originalname;

  const params = {
    Bucket: bucket,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const url = `https://${bucket}.s3.amazonaws.com/${params.Key}`;
  
  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return { url, filename };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Error uploading file to S3");
  }
};

module.exports = { upload, uploadToS3 };
