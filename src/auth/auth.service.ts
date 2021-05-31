import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

//import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * @returns Returns user data for the guard. Access it with req.user
   */
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

  /**
   * @returns Returns refresh_token
   */
  async login(user: any) {
    const payload = { token_type: "refresh", username: user.username, id: user.id, type: user.type};
    return this.jwtService.sign(payload, {
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) //1 week
    });
  }

  /**
   * @param {string} refresh_token Token received on login/signup (in cookie)
   * @returns Returns the access_token
   */
  async refresh(refresh_token: string) {
    const token_data:any= this.jwtService.decode(refresh_token)
    console.log ("token_data: ", JSON.stringify(token_data))
    const payload = { token_type: "access", username: token_data.username, id: token_data.id, type: token_data.type};

    return this.jwtService.sign(payload, {
      expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24) //1 day
    })
  }
}