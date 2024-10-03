import { Query } from 'mysql';
import { User } from '../entities/user.entity';
import { UserRegisterDto } from '../entities/user-register.dto';

export interface IUserRepository {
	create: (user: User) => Promise<null | UserRegisterDto>;
	// find: (username: string) => Promise<User | null>;
}
