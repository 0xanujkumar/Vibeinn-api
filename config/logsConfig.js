const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const rTracer = require('cls-rtracer');

// const logDir = path.join(__dirname, '..', 'tmp', 'logs');

// const logConfiguration = {
//     defaultMeta: { service: 'Midland API service' },
//     levels:{error: 0,
//         warn: 1,
//         info: 2,},
//     'transports': [
//         new winston.transports.Console(),
//         new DailyRotateFile({
//             filename: `${logDir}/%DATE%.log`,
//             datePattern: 'YYYY-MM-DD',
//             maxSize: '100m',
//             maxFiles: '30d',
//         })
//     ],

    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.printf((info) =>{
            if(info.level=="\u001b[32minfo\u001b[39m"){
                info.level="INFO";
                return `${[info.timestamp]}: ${rTracer.id()?rTracer.id():""} ${info.level}:  ${(typeof info.message)==='string'?info.message: JSON.stringify(info.message)} ${info.stack?"\n"+info.stack:" "}`
            } else if(info.level=="\u001b[31merror\u001b[39m"){
                info.level="error";
                return `${[info.timestamp]}: ${rTracer.id()?rTracer.id():""} ${info.level}: ${(typeof info.message)==='string'?info.message: JSON.stringify(info.message)} ${info.stack?"\n"+info.stack:" "}`
            } else if(info.level=="\u001b[33mwarn\u001b[39m"){
                info.level="warn";
                return `${[info.timestamp]}: ${rTracer.id()?rTracer.id():""} ${info.level}: ${(typeof info.message)==='string'?info.message: JSON.stringify(info.message)} ${info.stack?"\n"+info.stack:" "}`
            } else{
                return `${[info.timestamp]}: ${rTracer.id()?rTracer.id():""} ${info.level}: ${(typeof info.message)==='string'?info.message: JSON.stringify(info.message)} ${info.stack?"\n"+info.stack:" "}`
            }
        }),
    );
// winston.addColors({
//     fatal: 'underline magenta', error: 'bold red', warn: 'italic yellow',
//     info: 'italic cyan', verbose: 'italic green', debug: 'dim blue'
// });
const centralLogger = winston.createLogger(logConfiguration);

module.exports = centralLogger