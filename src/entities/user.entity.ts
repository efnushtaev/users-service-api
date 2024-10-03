import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _username: string,
		private readonly _brockerToken: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get username(): string {
		return this._username;
	}

	get brockerToken(): string {
		return this._brockerToken;
	}

	get password(): string {
		return this._password;
	}

	get getUser(): {
		email: string;
		username: string;
		brockerToken: string;
		password: string;
	} {
		return {
			email: this._email,
			username: this._username,
			brockerToken: this._brockerToken,
			password: this._password,
		};
	}

	public async setPassword(password: string, salt: string) {
		this._password = await hash(password, Number(salt));
	}

	public async comparePassword(password: string) {
		return compare(password, this._password);
	}
}
