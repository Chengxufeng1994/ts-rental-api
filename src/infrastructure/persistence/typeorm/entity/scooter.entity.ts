import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Scooter extends BaseEntity {
  @Column()
  status: string;

  @Column()
  battery: number;
}
