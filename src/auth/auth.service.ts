import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.fetchByName(username);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
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