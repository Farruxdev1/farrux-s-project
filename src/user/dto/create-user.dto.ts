import { IsEnum, IsOptional, isString, IsString, MinLength } from "class-validator"
import { Role } from "src/auth/enum/role.enum"

export class CreateUserDto{
    @IsString()
    email:string

    @IsString()
    password:string

    @IsEnum(Role)
    @IsOptional()
    role: Role
}