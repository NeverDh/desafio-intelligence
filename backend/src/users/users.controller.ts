import {
  Controller,
  Post,
  Body,

} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  checkUser(@Body() createUserDto: UserDto) {
    return this.usersService.checkUser(createUserDto);
  }
}
