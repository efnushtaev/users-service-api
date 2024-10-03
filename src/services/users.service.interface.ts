import { UserLoginDto } from "../entities/user-login.dto";
import { UserRegisterDto } from "../entities/user-register.dto";

export interface IUserService {
    comparePassword: (password: string, hashPassword?: string) => Promise<boolean>;
    // validateUser: (dto: UserLoginDto) => Promise<boolean>;
    createUser: (body: UserRegisterDto & {brockerToken: string}) => Promise<UserRegisterDto | null>;
}