import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, _: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (error: any, payload: any) => {
				if (error) {
					next();
				} else if (payload) {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
