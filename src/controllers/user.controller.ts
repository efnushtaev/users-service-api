import { inject, injectable } from 'inversify';
import { BaseController } from '../common/baseController';
import { IUsersController } from './user.controller.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { UserRegisterDto } from '../entities/user-register.dto';
import { UserLoginDto } from '../entities/user-login.dto';
import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { IControllerRoute } from '../common/route.interface';
import { IUserService } from '../services/users.service.interface';

@injectable()
export class UserController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.Logger) logger: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				func: this.register,
				method: 'post',
				// middlewares: [new ValidateMiddleware(UserRegisterDto), new GetBrockerToken()],
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	private signJWT(email: string, secret: string) {
		return new Promise((res, rej) => {
			sign(
				{ email, timestamp: Math.floor(Date.now() / 1000) },
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						rej(err);
					} else {
						res(token || '');
					}
				},
			);
		});
	}

	public async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		// const isValid = await this.userService.validateUser(body);
		const isValid = true;

		if (!isValid) {
			return next(new HTTPError(401, 'Ошибка авторизации', '/login'));
		}

		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));
		return this.ok(res, { jwt });
	}

	public async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	) {
		const user = await this.userService.createUser({...body, brockerToken: ''});

		if (!user) {
			return next(new HTTPError(422, 'Такой пользователь уже существует', '/register'));
		}


		return this.ok(res, { name: user.username, email: user.email });
	}
}
