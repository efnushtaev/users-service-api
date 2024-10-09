import { injectable } from 'inversify'
import { Logger } from 'tslog'
import { ILogger } from './logger.interface'
import 'reflect-metadata'
import { TEMPORARY_ANY } from '../types'

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<TEMPORARY_ANY>

  constructor() {
    this.logger = new Logger({
      // displayInstanceName: false,
      // displayLoggerName: false,
      // displayFilePath: 'hidden',
      // displayFunctionName: false,
    })
  }

  log(...args: unknown[]) {
    this.logger.info(...args)
  }

  error(...args: unknown[]) {
    this.logger.error(...args)
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args)
  }
}
