import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column({ type: 'date' })
  joinedAt: Date;

  @ManyToOne(() => Role, role => role.workers)
  role: Role;

  @ManyToOne(() => Worker, worker => worker.hiredBy, { nullable: true })
  hiredBy: Worker;

  @OneToMany(() => Worker, worker => worker.hiredBy)
  hires: Worker[];
}
