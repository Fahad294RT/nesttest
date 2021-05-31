import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { CaslModule } from './casl/casl.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UserModule, PhotoModule, AuthModule, CaslModule, FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
