import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'; 
import { GeneralEntity } from '../generic/generic.entity';

import { Photo } from "../photo/photo.entity";
import { Company } from "../company/company.entity";

@Entity()
export class User extends GeneralEntity {
  @PrimaryGeneratedColumn() 
   id: number; 
   
  @Column() 
   username: string;

  @Column({ select: false }) 
   password: string;

  @Column() 
   type: string;  //should be fixed enum e.g. admin/user etc

  @OneToMany(type => Photo, photo => photo.user) photos: Photo[];

  @OneToMany(type => Company, company => company.owner) companies: Company[]; 

  /**
   * To forcefully expire all JWT token upto specific date.
   */
  // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  //   validity: string;
}