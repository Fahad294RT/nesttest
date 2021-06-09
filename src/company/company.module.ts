import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';

import { DatabaseModule } from '../database/database.module';
import { companyProviders } from './company.providers';
import { CompanyService } from './company.service';

@Module({
  imports: [DatabaseModule],
  providers: [...companyProviders, CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
