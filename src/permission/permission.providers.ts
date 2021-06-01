import { Connection, Repository } from 'typeorm';
import { Permission } from './permission.entity';

export const permissionProviders = [
  {
    provide: 'PERMISSION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Permission),
    inject: ['DATABASE_CONNECTION'],
  },
];