import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { GeneralEntity } from '../generic/generic.entity';

import { Company } from "../company/company.entity"; 
import { Permission } from "../permission/permission.entity"; 

@Entity()
export class Role extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(type => Company, company => company.roles, {eager: true})
  @JoinTable() company: Company[];

  @ManyToMany(type => Permission, permission => permission.roles, {eager: true})
  @JoinTable() permissions: Permission[];
}