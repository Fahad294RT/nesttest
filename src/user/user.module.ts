import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...UserProviders,
    UserService,
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}