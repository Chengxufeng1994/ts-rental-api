import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { Rent } from './rent.entity';
import { BaseEntity } from './base.entity';

import { UserStatus } from '../../../../domain/valueobject/user-status.vo';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: UserStatus })
  status: string;

  @OneToOne(() => Rent, { nullable: true, cascade: true })
  @JoinColumn()
  currentRent: Rent | null;

  @OneToMany(() => Rent, (rent) => rent.user, { cascade: true })
  rentHistory: Rent[];
}
