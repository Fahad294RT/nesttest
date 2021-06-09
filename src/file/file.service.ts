import { Injectable, Inject } from '@nestjs/common';
import { Express } from 'express';

import { File } from './file.entity';
import { User } from '../user/user.entity';

import { FilePolyRepository } from './file.repository';
import { Connection, Repository } from 'typeorm';
import { Utility } from '../generic/utility.helper';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_REPOSITORY') private repository: FilePolyRepository, //private repository: Repository<File>,
  ) {}

  // async findAll(): Promise<File[]> {
  //   return this.repository.find();
  // }

  async read(page = 0): Promise<File[]> {
    //manual repo marker
    return this.repository.find({
      order: {
        id: 'DESC',
      },
      take: 10,
      skip: page * 10,
    });
  }

  async show(_id: number): Promise<File[]> {
    //manual repo marker
    return this.repository.find({
      select: ['originalname', 'mimetype', 'filename'],
      where: [{ id: _id }],
    });
  }

  async create(body: any, files: Express.Multer.File[]) {
    //manual repo marker

    const response = [];

    //this will be handled by the factory later
    const MyClass = Utility.getClass(body.resource);
    const myResource = new MyClass();
    myResource.id = body.resource_id;

    files.forEach(async (file) => {
      //const resource = new File();
      const resource = this.repository.create({
        resource_key: body.resource_key,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        filename: file.filename,
        size: file.size,
      });

      resource.resource = myResource;

      // TODO: store to bucket (https://stackoverflow.com/a/52261427)
      // TODO: cleanup on hard

      response.push(await this.repository.save(resource));
    });

    return response;
  }

  async update(body: any, files: Express.Multer.File[]) {
    //manual repo marker
    return null;
    //return this.repository.save(resource)
  }

  async delete(resource: File) {
    //manual repo marker
    //should be to change status instead of actually deleting that item
    return this.repository.delete(resource);
  }
}
