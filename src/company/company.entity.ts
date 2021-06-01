import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable} from 'typeorm';
import { User } from "../user/user.entity"; 

import { GeneralEntity } from '../generic/generic.entity';

@Entity()
export class Company extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(type => User, user => user.companies, {eager: true})
  @JoinTable() owner: User[];
}