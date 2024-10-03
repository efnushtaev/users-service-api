import mysql, { Query } from 'mysql2';

import { inject, injectable } from 'inversify';
import { TEMPORARY_ANY, TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class MysqlService {
	private connectBD: mysql.Connection;

	constructor(@inject(TYPES.ConfigService) config: IConfigService) {
		console.log('config: ', config)
		this.connectBD = mysql.createConnection({
			port: 3306,
			host: config.get('HOST'),
			user: config.get('USER'),
			password: config.get('PASSWORD'),
			database: config.get('DB')
		});
	}

	public connection() {
		this.connectBD.connect((err) => {
			console.log('err: ', err)
			if (err) {
				throw Error(err as any);
			}

			console.log('успешно соединено с базой данных');
		});
	}

	public async query(query: string, value?: any, callback?: TEMPORARY_ANY) {
		const result = this.connectBD.query(query, value, callback);
	}
}
