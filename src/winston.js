const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const {combine, timestamp, printf, colorize} = winston.format;

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    // 로그에 대한 형식을 정할 수 있다.
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: './logs',
            filename: `server_%DATE%.log`,
            maxSize: '20m',
            maxFiles: '7d',
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: './logs',
            filename: `server_%DATE%.warn.log`,
            maxSize: '20m',
            maxFiles: '7d',
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: './logs',
            filename: `server_%DATE%.error.log`,
            maxSize: '20m',
            maxFiles: '7d',
            zippedArchive: true,
        }),
    ],
});

// production 모드가 아닐 경우
// 배포 환경에서는 최대한 자원 안잡아먹는 로그 출력해야함
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            //colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
            logFormat // log format 적용
        )
    }));
}

//morgan과 연동
const stream = {
    write: message => {
        logger.info(message)
    }
}

module.exports = {logger: winston, stream};