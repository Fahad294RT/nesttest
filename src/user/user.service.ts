import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  // async findAll(): Promise<User[]> {
  //   return this.repository.find();
  // }

  async read(): Promise<User[]> {
    return this.repository.find({
      order: {
        id: "DESC"
      },
      take: 10,
      skip: 0
    });
  }

  async show(_id: number): Promise<User> {
    return this.repository.findOne({
      select: ["name"],
      where: [{ "id": _id }]
    });
  }

  async fetchByName(name: string): Promise<User> {
    return this.repository.findOne({
      //select: ["name"],
      where: [{ "name": name }]
    });
  }

  async create() {
    const  resource = new User();

    //https://stackoverflow.com/a/62130952 use this instead
    // const resource = this.repository.create({
    //  name: "Some name" <-- should be argument
    // });

    return this.repository.save(resource)
  }

  async update(resource: User) {
    return this.repository.save(resource)
  }

  async delete(resource: User) {
    //should be to change status instead of actually deleting that item
    return this.repository.delete(resource);
  }
}