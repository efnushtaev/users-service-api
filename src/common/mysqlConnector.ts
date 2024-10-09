import mysql from 'mysql2';

import { inject, injectable } from 'inversify';
import { TEMPORARY_ANY, TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class MysqlService {
	private connectBD: mysql.Connection;
	private logger: ILogger

	constructor(@inject(TYPES.ConfigService) config: IConfigService, @inject(TYPES.Logger) logger: ILogger) {
		this.connectBD = mysql.createConnection({
			port: Number(config.get('PORT')),
			host: config.get('HOST'),
			user: config.get('USER'),
			password: config.get('PASSWORD'),
			database: config.get('DB')
		});
		this.logger = logger
	}

	public connection() {
		this.connectBD.connect((err) => {
			if (err) {
				throw Error(err as TEMPORARY_ANY);
			}

			console.log('успешно соединено с базой данных');
		});
	}

	public async query(query: string, value?: TEMPORARY_ANY, callback?: TEMPORARY_ANY) {
		this.connectBD.query(query, value, callback);
		this.logger.log(`Добавлен новый пользователь: ${JSON.stringify(value)}`);
	}
}
