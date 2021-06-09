import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';

import { GeneralEntity } from '../generic/generic.entity';

@Entity()
export class Photo extends GeneralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;

  @ManyToOne((type) => User, (user) => user.photos, { eager: true })
  @JoinTable()
  user: User[];

  constructor(obj: any) {
    super();

    if (!obj) {
      return;
    }

    this.name = obj.name || '';
    this.description = obj.description || '';
    this.filename = obj.filename || '';
    this.views = obj.views || 0;
    this.isPublished = obj.isPublished || false;
    this.user = obj.user || null;
  }
}
