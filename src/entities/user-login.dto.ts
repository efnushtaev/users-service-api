import { IsString } from 'class-validator'

export class UserLoginDto {
  @IsString({ message: 'Не указан email' })
  email: string

  @IsString({ message: 'Не указан пароль' })
  password: string
}
