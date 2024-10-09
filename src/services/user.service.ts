import { inject, injectable } from 'inversify';
import { IUsersController } from '../controllers/user.controller.interface';
import { UserLoginDto } from '../entities/user-login.dto';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { compare } from 'bcryptjs';
import { UserRegisterDto } from '../entities/user-register.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.UserRepositry) private userRepositry: IUserRepository,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {}

	comparePassword(password: string, hash = '') {
		return compare(password, hash);
	}

	// async validateUser({ email, password }: UserLoginDto) {
	// 	const findedUser = await findUserByEmail(email);

	// 	if (!findedUser) {
	// 		return false;
	// 	}

	// 	return this.comparePassword(password, findedUser.password);
	// }

	async createUser({
		email,
		username,
		password,
		brockerToken,
	}: UserRegisterDto & { brockerToken: string }) {
		// const findedUser = await this.userRepositry.find(username);
		const findedUser = false;

		if (findedUser) {
			return null;
		}

		const newUser = new User(email, username, brockerToken);
		await newUser.setPassword(password, this.configService.get('SALT'));
		const result = await this.userRepositry.create(newUser);

		return result;
	}
}
