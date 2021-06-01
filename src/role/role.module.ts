import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

import { DatabaseModule } from '../database/database.module';
import { roleProviders } from './role.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...roleProviders, RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
