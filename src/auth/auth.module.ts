import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


import { CaslModule } from '../casl/casl.module';

import { PermGuard } from './perm.guard';

@Module({
  imports: [
    CaslModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,
    // { provide: "APP_GUARD", useClass: PermGuard }
  ],
  exports: [AuthService],
})
export class AuthModule {}