import { DataSource, Repository } from "typeorm";
import { Worker } from "../entities/workers.entity";
import { CreateWorkerDto } from "./dto/create-worker.dto";
import { Injectable } from "@nestjs/common";
import { PatchWorkerDto } from "./dto/patch-worker.dto";

@Injectable()
export class WorkerRepository extends Repository<Worker> {
    constructor(private dataSource: DataSource) {
        super(Worker, dataSource.createEntityManager());
    }
    
    async createWorker(createWorkerDto: CreateWorkerDto): Promise<Worker> {
        const worker = this.create({
            ...createWorkerDto,
            joinedAt: new Date()
        })

        await this.save(worker)
        return worker;
    }

    async updateWorker(id: number, patchWorkerDto: PatchWorkerDto): Promise<Worker> {
        const worker = await this.findOne({ where: { id }})
        const updatedWorker = {
            ...worker,
            ...patchWorkerDto,
        }

        await this.save(updatedWorker)
        return updatedWorker
    }
}