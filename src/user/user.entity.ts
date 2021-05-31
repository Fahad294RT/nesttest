import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Photo } from "../photo/photo.entity"; 

import { GeneralEntity } from '../generic/generic.entity';

@Entity()
export class User extends GeneralEntity {
  @PrimaryGeneratedColumn() 
   id: number; 
   
  @Column() 
   username: string;

  @Column() 
   password: string;

  @Column() 
   type: string;  //should be fixed enum e.g. admin/user etc

  @OneToMany(type => Photo, photo => photo.user) photos: Photo[]; 

  /**
   * To forcefully expire all JWT token upto specific date.
   */
  // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  //   validity: string;
}