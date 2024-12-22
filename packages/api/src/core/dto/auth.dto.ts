import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';
import { IsEqualWithProp } from '@lib/class-validator/decorator/equal-prop.validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthRequestForgotPassword {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AuthVerifyForgotPassword {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @Length(6)
  @IsNotEmpty()
  code: string;
}

export class AuthChangePassword {
  @IsStrongPassword({ minLowercase: 1, minSymbols: 1, minUppercase: 1, minNumbers: 1, minLength: 6 })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEqualWithProp('password')
  confirmation_password: string;
}
