import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Worker } from "./workers.entity";


@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ unique: true })
    name: string

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    bonusPerYear: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    bonusPerSubordinate: string;

    @Column()
    bonusPerYearCap: number;

    @OneToMany(() => Worker, worker => worker.role)
    workers: Worker[];
}