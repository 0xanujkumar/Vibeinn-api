require('dotenv').config();

module.exports = {
    awsGeneralConfigs: {
        region: 'ap-south-1',
        secretAccessKey: process.env.AWS_SECRET_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY,
    },
    awsSnsConfigs: {
        region: 'ap-south-1',
        apiVersion: '2010-03-31'
    },
    awsS3Configs: {
        bucket: process.env.AWS_S3_BUCKET_NAME,
        expirationTime: 1800,
        accessLink: process.env.S3BUCKET_CLOUDFRONT_LINK
    },
}