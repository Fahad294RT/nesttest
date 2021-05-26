import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Request} from '@nestjs/common';
import { PhotoService as Service} from './photo.service';
import { Photo as Resource} from './photo.entity';

//import {User} from '../user/user.entity'

import { CrudAction } from '../casl/crud.action';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Controller('photo')
export class PhotoController {

    constructor(private service: Service, private caslAbilityFactory: CaslAbilityFactory) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    get(@Param() params, @Request() req) {
      const ability = this.caslAbilityFactory.createForUser(req.user);
      if (ability.can(CrudAction.Read, 'all')) {
        console.log("user can read all")
      } else {
        console.log("user cannot read all")
      }

      return this.service.read();
    }

    @Get(':id')
    show(@Param() params) {
      return this.service.show(params.id);
    }

    @Post()
    create(@Body() resource: Resource) {
      //return this.service.create();
      return this.service.update(resource);
    }

    @Put()
    update(@Body() resource: Resource) {
      return this.service.update(resource);
    }

    @Delete(':id')
    delete(@Param() params) {
      return this.service.delete(params.id);
    }
}