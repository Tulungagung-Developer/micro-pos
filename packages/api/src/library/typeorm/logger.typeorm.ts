import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { LoggerOptions as TypeOrmLoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Logger } from '@nestjs/common';

export class TypeOrmLoggerContainer implements TypeOrmLogger {
  static ForConnection(options: TypeOrmLoggerOptions) {
    const logger = new Logger('TypeORM');
    return new TypeOrmLoggerContainer(logger, options);
  }

  constructor(
    private readonly _logger: Logger,
    private readonly _options: TypeOrmLoggerOptions,
  ) {}

  logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    if (
      this._options === 'all' ||
      this._options === true ||
      (this._options instanceof Array && this._options.indexOf('query') !== -1)
    ) {
      const sql =
        query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
      this._logger.log('query' + ': ' + sql);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    if (
      this._options === 'all' ||
      this._options === true ||
      (this._options instanceof Array && this._options.indexOf('error') !== -1)
    ) {
      const sql =
        query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
      this._logger.log(`query failed: ` + sql);
      this._logger.log(`error:`, error);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    this._logger.log(`query is slow: ` + sql);
    this._logger.log(`execution time: ` + time);
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    if (this._options === 'all' || (this._options instanceof Array && this._options.indexOf('schema') !== -1)) {
      this._logger.log(message);
    }
  }

  logMigration(message: string, _queryRunner?: QueryRunner) {
    this._logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        if (this._options === 'all' || (this._options instanceof Array && this._options.indexOf('log') !== -1))
          this._logger.log(message);
        break;
      case 'info':
        if (this._options === 'all' || (this._options instanceof Array && this._options.indexOf('info') !== -1))
          this._logger.debug(message);
        break;
      case 'warn':
        if (this._options === 'all' || (this._options instanceof Array && this._options.indexOf('warn') !== -1))
          this._logger.warn(message);
        break;
    }
  }

  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (_error) {
      return parameters;
    }
  }
}
