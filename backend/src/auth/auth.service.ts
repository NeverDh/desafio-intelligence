import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async login(userDto: UserDto): Promise<AuthResponseDto> {
    const foundUser = await this.userService.checkUser(userDto);

    if (!foundUser || !compareSync(userDto.password, foundUser.senha)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, login: foundUser.login };
    const token = this.jwtService.sign(payload);
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
