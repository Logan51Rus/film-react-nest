import { Injectable, ConsoleLogger } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class DevLogger extends ConsoleLogger {
  customLog(message: string) {
    this.log(`Custom log: ${message}`);
  }

  private writeLogToFile(message: string) {
    fs.appendFile(
      'logs.txt',
      `${new Date().toUTCString()} - ${message}\n`,
      (err) => {
        if (err) {
          throw err;
        }
      },
    );
  }
}
