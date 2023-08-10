import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerRepository } from './workers.repository';
import { Worker } from 'src/entities/workers.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { RolesService } from '../roles/roles.service';
import { PatchWorkerDto } from './dto/patch-worker.dto';

@Injectable()
export class WorkersService {
    constructor(
        @InjectRepository(WorkerRepository)
        private readonly workerRepository: WorkerRepository,
    ) {}

    @Inject(RolesService)
    private readonly rolesService: RolesService
    
    async getWorkerById(id: number, checkDate: Date): Promise<Worker> {
        const worker = await this.workerRepository.findOne({ where: { id }, relations: ['hires', 'role'] })

        if (!worker) {
            throw new NotFoundException(`Can't find worker with this id ${id}`)
        }

        const roleInstance = this.rolesService.getRoleInstance(worker)
        const salary = await roleInstance.countWorkerSalary(worker, checkDate)
        
        delete worker.hires

        return {
            ...worker,
            salary
        }
    }

    async getAllWorkers(checkDate: Date): Promise<{ workers: Worker[], totalSalary: number }> {
        const workerRecords = await this.workerRepository.find({ relations: ['hires', 'role'] })

        const result: { workers: Worker[], totalSalary: number } = await workerRecords.reduce(async (acc, worker) => {
            const roleInstance = this.rolesService.getRoleInstance(worker)
            const salary = await roleInstance.countWorkerSalary(worker, checkDate)
            const { workers, totalSalary } = await acc;
            delete worker.hires
            return {
                workers: workers.concat({ ...worker, salary }),
                totalSalary: totalSalary + salary
            }
        }, Promise.resolve({
            workers: [] as Worker[],
            totalSalary: 10
        }))

        return result
    }

    async createWorker(createWorkerDto: CreateWorkerDto): Promise<Worker> {
        return this.workerRepository.createWorker(createWorkerDto)
    }

    async deleteWorker(id: number): Promise<unknown> {
        const worker = await this.workerRepository.delete(id)
        
        if (worker.affected === 0) {
            throw new NotFoundException(`Can't find worker with this id ${id}`)
        }
        return {
            id,
            message: 'deleted'
        }
    }

    async updateWorker(id: number, patchWorkerDto: PatchWorkerDto): Promise<Worker> {
        return this.workerRepository.updateWorker(id, patchWorkerDto)
    }
}
