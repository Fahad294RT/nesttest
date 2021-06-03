import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable} from 'typeorm';
import { GeneralEntity } from '../generic/generic.entity';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { PolymorphicChildInterface } from '../generic/polymorphic.interface';

import { User } from "../user/user.entity";

@Entity()
export class File extends GeneralEntity implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resource_key: string

  @Column('text')
  originalname: string

  @Column({ length: 70 })
  encoding: string;

  @Column({ length: 70 })
  mimetype: string;

  @Column({ length: 70 })
  filename: string;

  @Column()
  size: number

  @PolymorphicParent(() => [User])
  resource: User; // | AnotherItem

  @Column()
  entityId: string;

  @Column()
  entityType: string;
}