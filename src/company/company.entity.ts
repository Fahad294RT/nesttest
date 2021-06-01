import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany} from 'typeorm';
import { GeneralEntity } from '../generic/generic.entity';

import { User } from "../user/user.entity"; 
import { Role } from "../role/role.entity"; 

@Entity()
export class Company extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  /**
   * Different from user type
   */
  @Column() 
  type: string;

  @OneToMany(type => Role, role => role.company) roles: Role[];

  @ManyToOne(type => User, user => user.companies, {eager: true})
  @JoinTable() owner: User[];
}