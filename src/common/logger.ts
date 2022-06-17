import { debug } from 'console';
import path from 'path';
import winston, { child } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

export class helper {
  static getLogger(moduleName: string): any {
    const { combine, timestamp, printf } = winston.format;
    const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장

    // Define log format
    const logFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}] ${moduleName} - ${message}`;
    });

    /*
     * Log Level
     * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
     */
    const logger = winston.createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir,
          filename: `%DATE%.log`,
          maxFiles: 3, // 30일치 로그 파일 저장
          zippedArchive: true,
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir,
          filename: `%DATE%.error.log`,
          maxFiles: 3,
          zippedArchive: true,
        }),
      ],
    });

    // Production 환경이 아닌 경우(dev 등)
    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize(), // 색깔 넣어서 출력
          ),
        }),
      );
    }

    return logger;
  }
}
