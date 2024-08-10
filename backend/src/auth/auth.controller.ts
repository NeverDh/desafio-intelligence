import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(
    @Body() userDto: UserDto
  ): Promise<AuthResponseDto> {
    return await this.authService.login(userDto);
  }
}
