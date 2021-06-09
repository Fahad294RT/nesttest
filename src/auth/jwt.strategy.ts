import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    if (payload.token_type !== 'access') {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Not a valid access token.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return { username: payload.username, id: payload.id, type: payload.type };
  }
}
