import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { CaslModule } from './casl/casl.module';
import { FileModule } from './file/file.module';
import { CompanyModule } from './company/company.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    UserModule,
    PhotoModule,
    AuthModule,
    CaslModule,
    FileModule,
    CompanyModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
