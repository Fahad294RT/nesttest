import { Column, BaseEntity, UpdateDateColumn, CreateDateColumn} from 'typeorm';
import { User } from "../user/user.entity"; 

export abstract class GeneralEntity extends BaseEntity {

  /**
   * Status can be draft, active, deleted
   * Draft state when resource waiting for operation like uploads/transactions
   */
  @Column({ length: 70, default: 'draft'})
    status: string;

  @UpdateDateColumn()
    created: Date;
  
  @CreateDateColumn()
    updated: Date;

  // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"))
  //   created: string;
}