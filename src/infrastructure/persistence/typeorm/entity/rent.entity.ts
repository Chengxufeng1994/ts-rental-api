import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Rent extends BaseEntity {
  @Column()
  status: string;

  @Column()
  scooterId: string;

  @Column()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @ManyToOne(() => User, (user) => user.rentHistory)
  user: User;
}
