import { Controller, Query, Post, Body, Get, Put, Delete, Param, UseGuards, Request} from '@nestjs/common';
import { PhotoService as Service} from './photo.service';
import { Photo } from './photo.entity';

//import {User} from '../user/user.entity'

import { CrudAction } from '../casl/crud.action';
import { AppAbility } from '../casl/casl-ability.factory';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermGuard } from '../auth/perm.guard';
import { CheckPolicies } from '../auth/perm.decorator';

import { CaslAbilityFactory } from '../casl/casl-ability.factory';

@Controller('photo')
export class PhotoController {

    constructor(private service: Service, private caslAbilityFactory: CaslAbilityFactory) { }

    @UseGuards(JwtAuthGuard, PermGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(CrudAction.Read, Photo))

    @Get()
    get(@Query() query, @Request() req) {
      // const ability = this.caslAbilityFactory.createForUser(req.user);
      // if (ability.can(CrudAction.Read, 'all')) {
      //   console.log("user can read all")
      // } else {
      //   console.log("user cannot read all")
      // }
      // return req.user

      return this.service.read((query.page || 1) - 1 );
    }

    @Get(':id')
    show(@Param() params) {
      return this.service.show(params.id);
    }

    @Post()
    create(@Body() resource: Photo) {
      //return this.service.create();
      return this.service.update(resource);
    }

    @Put()
    update(@Body() resource: Photo) {
      return this.service.update(resource);
    }

    @Delete(':id')
    delete(@Param() params) {
      return this.service.delete(params.id);
    }
}