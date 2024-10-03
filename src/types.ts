export const TYPES = {
	Application: Symbol.for('Application'),
	Logger: Symbol.for('Logger'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	UserRepositry: Symbol.for('UserRepositry'),
	MysqlService: Symbol.for('MysqlService')
};

export type TEMPORARY_ANY = any;