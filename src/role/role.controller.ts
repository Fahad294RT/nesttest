import { Controller, Query, Post, Body, Get, Put, Delete, Param, UseGuards, Request} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('role')
export class RoleController {

    constructor(private service: RoleService) { }

    @Get()
    get(@Query() query) {
      return this.service.read((query.page || 1) - 1 );
    }

    @Get(':id')
    show(@Param() params) {
      return this.service.show(params.id);
    }

    @Post()
    create(@Body() resource: Role) {
      return this.service.update(resource);
    }

    @Put()
    update(@Body() resource: Role) {
      return this.service.update(resource);
    }

    @Delete(':id')
    delete(@Param() params) {
      return this.service.delete(params.id);
    }
}