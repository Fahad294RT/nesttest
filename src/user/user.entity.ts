import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Photo } from "../photo/photo.entity"; 

@Entity()
export class User {
  @PrimaryGeneratedColumn() 
   id: number; 
   
  @Column() 
   name: string;

  @Column() 
   password: string;

  @Column() 
   type: string;  //should be fixed enum e.g. admin/user etc

  @OneToMany(type => Photo, photo => photo.user) photos: Photo[]; 
}