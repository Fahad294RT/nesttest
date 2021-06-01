import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

import { DatabaseModule } from '../database/database.module';
import { permissionProviders } from './permission.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...permissionProviders, PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule {}
