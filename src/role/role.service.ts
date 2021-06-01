import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private repository: Repository<Role>,
  ) {}

  async read(page: number = 0): Promise<Role[]> {
    return this.repository.find({
      order: {
        id: "DESC",
        name: "ASC"
      },
      take: 10,
      skip: page * 10
    });
  }

  async show(_id: number): Promise<Role[]> {
    return this.repository.find({
      select: ["name", "description"],
      where: [{ "id": _id }]
    });
  }

  async create() {
    const  resource = new Role();
    return this.repository.save(resource)
  }

  async update(resource: Role) {
    return this.repository.save(resource)
  }

  async delete(resource: Role) {
    //should be to change status instead of actually deleting that item
    return this.repository.delete(resource);
  }
}