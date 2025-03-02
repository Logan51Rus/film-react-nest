import { Module } from '@nestjs/common';
import { DevLogger } from './dev-logger';

@Module({
  providers: [DevLogger],
  exports: [DevLogger],
})
export class LoggerModule {}
