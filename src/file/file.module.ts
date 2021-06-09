import { Module } from '@nestjs/common';
import { FileController } from './file.controller';

import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { fileProviders } from './file.providers';
import { FileService } from './file.service';

//import { FilePolyRepository } from './file.repository';

@Module({
  imports: [DatabaseModule], //, TypeOrmModule.forFeature([FilePolyRepository])
  providers: [...fileProviders, FileService],
  controllers: [FileController],
})
export class FileModule {}
