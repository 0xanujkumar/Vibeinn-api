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
}