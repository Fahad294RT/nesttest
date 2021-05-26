import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private service: UserService) { }

    @Get()
    get(@Param() params) {
      return this.service.read();
    }

    @Get(':id')
    show(@Param() params) {
      return this.service.show(params.id);
    }

    @Post()
    create(@Body() resource: User) {
      //return this.service.create();
      return this.service.update(resource);
    }

    @Put()
    update(@Body() resource: User) {
      return this.service.update(resource);
    }

    @Delete(':id')
    delete(@Param() params) {
      return this.service.delete(params.id);
    }
}