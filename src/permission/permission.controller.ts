import {
  Controller,
  Query,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';

@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}

  @Get()
  get(@Query() query) {
    return this.service.read((query.page || 1) - 1);
  }

  @Get(':id')
  show(@Param() params) {
    return this.service.show(params.id);
  }

  @Post()
  create(@Body() resource: Permission) {
    return this.service.update(resource);
  }

  @Put()
  update(@Body() resource: Permission) {
    return this.service.update(resource);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.service.delete(params.id);
  }
}
