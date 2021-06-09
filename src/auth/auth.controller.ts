import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const refresh_token = await this.authService.login(req.user);

    //set cookie here

    return {
      refresh_token,
    };
  }

  @Post('refresh')
  async refresh(@Request() req) {
    const refresh_token = req.headers['refresh_token'];

    const access_token = await this.authService.refresh(refresh_token);

    //set cookie here

    return {
      access_token,
    };
  }

  /**
   * Requires authentication
   * Clears both access and refresh token
   * Any other logout events will go here too.
   * @returns Return status pass/failed
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    //clear cookie here

    return {
      status: 'pass',
    };
  }
}
