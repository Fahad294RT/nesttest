import { Connection, Repository } from 'typeorm';
import { File } from './file.entity';
import { FilePolyRepository } from './file.repository';

export const fileProviders = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(FilePolyRepository),
    inject: ['DATABASE_CONNECTION'],
  },
];
