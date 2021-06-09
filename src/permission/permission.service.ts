import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private repository: Repository<Permission>,
  ) {}

  async read(page = 0): Promise<Permission[]> {
    return this.repository.find({
      order: {
        id: 'DESC',
        name: 'ASC',
      },
      take: 10,
      skip: page * 10,
    });
  }

  async show(_id: number): Promise<Permission[]> {
    return this.repository.find({
      select: ['name', 'description'],
      where: [{ id: _id }],
    });
  }

  async create() {
    const resource = new Permission();
    return this.repository.save(resource);
  }

  async update(resource: Permission) {
    return this.repository.save(resource);
  }

  async delete(resource: Permission) {
    //should be to change status instead of actually deleting that item
    return this.repository.delete(resource);
  }
}
