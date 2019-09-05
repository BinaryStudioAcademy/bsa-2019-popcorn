
const uuid = require("uuid/v4")

const uploadToAmazon = async base64 => {
  const AWS = require("aws-sdk");
  const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    S3_BUCKET,
    AWS_REGION
  } = process.env;
  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    region: AWS_REGION,
    secretAccessKey: SECRET_ACCESS_KEY
  });
  const s3 = new AWS.S3();
  const base64Data = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64.split(";")[0].split("/")[1];
  const userId = uuid();
  const params = {
    Bucket: S3_BUCKET,
    Key: `files/${userId}.${type}`,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${type}`
  };
  let location = "";
  try {
    const { Location } = await s3.upload(params).promise();
    location = Location;
  } catch (error) {
    console.log(error);
  }

  return location;
};

export const upload = async base64File => {
  return await uploadToAmazon(base64File);
};
