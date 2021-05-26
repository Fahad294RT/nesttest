import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo as Resource} from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private repository: Repository<Resource>,
  ) {}

  // async findAll(): Promise<Resource[]> {
  //   return this.repository.find();
  // }

  async read(): Promise<Resource[]> {
    return this.repository.find({
      order: {
        id: "DESC",
        name: "ASC"
      },
      take: 10,
      skip: 0
    });
  }

  async show(_id: number): Promise<Resource[]> {
    return this.repository.find({
      select: ["name", "description"],
      where: [{ "id": _id }]
    });
  }

  async create() {
    const  resource = new Resource();
    return this.repository.save(resource)
  }

  async update(resource: Resource) {
    return this.repository.save(resource)
  }

  async delete(resource: Resource) {
    //should be to change status instead of actually deleting that item
    return this.repository.delete(resource);
  }
}