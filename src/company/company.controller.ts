import { Controller, Query, Post, Body, Get, Put, Delete, Param, UseGuards, Request} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.entity';

@Controller('company')
export class CompanyController {

    constructor(private service: CompanyService) { }

    @Get()
    get(@Query() query) {
      return this.service.read((query.page || 1) - 1 );
    }

    @Get(':id')
    show(@Param() params) {
      return this.service.show(params.id);
    }

    @Post()
    create(@Body() resource: Company) {
      return this.service.update(resource);
    }

    @Put()
    update(@Body() resource: Company) {
      return this.service.update(resource);
    }

    @Delete(':id')
    delete(@Param() params) {
      return this.service.delete(params.id);
    }
}