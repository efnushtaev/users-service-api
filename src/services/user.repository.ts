import { inject, injectable } from 'inversify';
import { IUserRepository } from './user.repository.interface';

import { TEMPORARY_ANY, TYPES } from '../types';
import { MysqlService } from '../common/mysqlConnector';
import { User } from '../entities/user.entity';
import { IExeptionFilter } from '../errors/exeption.filter.interface';
import { UserRegisterDto } from '../entities/user-register.dto';

@injectable()
export class UserRepositry implements IUserRepository {
	constructor(
		@inject(TYPES.MysqlService) private mysqlService: MysqlService,
		// @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
	) {}

	// async find(user) {}

	async create(user: User) {
		const promise = new Promise<UserRegisterDto | null>((resolve, reject) => {
			this.mysqlService.query(
				'INSERT INTO USERS SET ?',
				user.getUser,
				(err: TEMPORARY_ANY, res: TEMPORARY_ANY) => {
					if (err) {
						reject(err);
					}

					resolve(res);
				},
			);
		});

		return promise;
	}
}
