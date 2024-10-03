import { TYPES } from './types';
import { Server } from 'http';
import express, { Express, json } from 'express';

import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { routes } from './routes/deals.routes';
import { AuthMiddleware } from './common/auth.middleware';
import { UserController } from './controllers/user.controller';
import { MysqlService } from './common/mysqlConnector';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		// @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.MysqlService) private mysqlService: MysqlService,
	) {
		this.app = express();
		this.port = 8001;
	}

	private useMiddleware(): void {
		this.app.use(json());
		const authMiddlware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddlware.execute.bind(authMiddlware));
	}

	private useRoutes(): void {
		routes(this.app);
		this.app.use('/users', this.userController.router);
	}

	// private useExeptionFilters(): void {
	// 	this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	// }

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		// this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.mysqlService.connection()
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
