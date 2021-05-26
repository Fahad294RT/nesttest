import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.fetchByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      //console.log("user fetched!", JSON.stringify(result, null, 2))
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id, type: user.type};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}