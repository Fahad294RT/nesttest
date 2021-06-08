import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY') private repository: Repository<Photo>,
  ) {}

  // async findAll(): Promise<Resource[]> {
  //   return this.repository.find();
  // }

  async read(page: number = 0): Promise<Photo[]> {
    return this.repository.find({
      order: {
        id: "DESC",
        name: "ASC"
      },
      take: 10,
      skip: page * 10
    });
  }

  async show(_id: number): Promise<Photo[]> {
    return this.repository.find({
      select: ["name", "description"],
      where: [{ "id": _id }]
    });
  }

  async create(resource: Photo) {
    //const  resource = new Resource();
    const res = this.repository.create(resource);
    return this.repository.save(res)
  }

  async update(resource: Photo) {
    return this.repository.save(resource)
  }

  async delete(resource: Photo) {
    //should be to change status instead of actually deleting that item
    return this.repository.delete(resource);
  }
}