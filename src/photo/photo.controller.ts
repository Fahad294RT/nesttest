import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { PhotoService as Service} from './photo.service';
import { Photo as Resource} from './photo.entity';

@Controller('photo')
export class PhotoController {

    constructor(private service: Service) { }

    @Get()
    get(@Param() params) {
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