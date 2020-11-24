import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('meetings')
class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  transcription: string;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Meeting;
