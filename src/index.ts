import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from './app';
import { MysqlService } from './common/mysqlConnector';
import { ConfigService } from './config/config.service';
import { UserController } from './controllers/user.controller';
import { UserRepositry } from './services/user.repository';
import { UserService } from './services/user.service';
import { LoggerService } from './logger/loggerService';
import { IConfigService } from './config/config.service.interface';
import { IUsersController } from './controllers/user.controller.interface';
import { IUserRepository } from './services/user.repository.interface';
import { IUserService } from './services/users.service.interface';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from './errors/exeption.filter';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IUserRepository>(TYPES.UserRepositry).to(UserRepositry).inSingletonScope();
	bind<IUsersController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<MysqlService>(TYPES.MysqlService).to(MysqlService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();
}

bootstrap();
