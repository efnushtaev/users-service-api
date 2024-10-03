import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from './middleware.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);

		validate(instance).then((err) => {
			if (err.length > 0) {
				res.status(422).send(err);
			} else {
				next();
			}
		});
	}
}
