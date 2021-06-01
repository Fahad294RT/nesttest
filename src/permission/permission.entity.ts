import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany} from 'typeorm';
import { GeneralEntity } from '../generic/generic.entity';

import { Role } from "../role/role.entity"; 

@Entity()
export class Permission extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  /**
   * Directly corresponds to company type
   */
  @Column() 
  type: string;

  @ManyToMany(type => Role, role => role.permissions)
  roles: Role[];
}