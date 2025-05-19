import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}
@Post('login')
async login(@Body() body: { email: string; password: string }) {
  const user = await this.usersService.validateUser(body.email, body.password);
  if (!user) {
    throw new UnauthorizedException('pass and email not found');
  }

  return this.authService.login(user); 
}

}
