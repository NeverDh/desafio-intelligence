/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    login: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
