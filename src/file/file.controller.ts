import { Controller, Query, Post, Body, Get, Put, Delete, Param, UseInterceptors, UseGuards, Request} from '@nestjs/common';

import { FileService } from './file.service';
import { File } from './file.entity';

import { Express } from 'express'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UploadedFiles } from '@nestjs/common'
import { diskStorage } from 'multer';

@Controller('file')
export class FileController {

    constructor(private service: FileService) { }

    @Get()
    get(@Query() query) {
      return this.service.read((query.page || 1) - 1 );
    }

    @Get(':id')
    show(@Param() params) {
      return this.service.show(params.id);
    }

    /**
     * @param {string} file Multiple files (bulk upload only for very small files)
     * @returns Returns hash of the files in registery
     */
    @Post('create')
    @UseInterceptors(
      FilesInterceptor('files', 20, {
        storage: diskStorage({
          destination: './uploads/'
        })
      }),
    )
    create(@Body() body: any, @UploadedFiles() files: Express.Multer.File[]) {
      return this.service.create(body, files);
    }

    @Put()
    update(@Body() body: any, @UploadedFiles() files: Express.Multer.File[]) {
      return this.service.update(body, files);
    }

    @Delete(':id')
    delete(@Param() params) {
      return this.service.delete(params.id);
    }
}