import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class TskvLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return `level=${level}\tmessage=${message}\toptionalParams=${optionalParams}\n`;
  }
}
