import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private repository: Repository<Company>,
  ) {}

  // async findAll(): Promise<Company[]> {
  //   return this.repository.find();
  // }

  async read(page = 0): Promise<Company[]> {
    return this.repository.find({
      order: {
        id: 'DESC',
        name: 'ASC',
      },
      take: 10,
      skip: page * 10,
    });
  }

  async show(_id: number): Promise<Company[]> {
    return this.repository.find({
      select: ['name', 'description'],
      where: [{ id: _id }],
    });
  }

  async create() {
    const company = new Company();
    return this.repository.save(company);
  }

  async update(company: Company) {
    return this.repository.save(company);
  }

  async delete(company: Company) {
    //should be to change status instead of actually deleting that item
    return this.repository.delete(company);
  }
}
