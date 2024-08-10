import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  checkUser(userDto: UserDto) {
    const login: string = userDto.login;
    return this.prismaService.users.findFirst({
      where:{ login: login},
    });
  }
}
