import { Inject, Injectable } from "@nestjs/common";
import { RoleConstructor } from "./RoleConstructor";
import { Worker } from "../../entities/workers.entity";
import { WorkerRepository } from "../../workers/workers.repository";
import { In } from "typeorm";
import { Role } from "../../entities/role.entity";

@Injectable()
export class SalesService implements RoleConstructor {
    constructor(
        @Inject(WorkerRepository)
        private readonly workerRepository: WorkerRepository
    ) {}
    async countWorkerSalary(worker: Worker, checkDate: Date): Promise<number> {
        const { hires, role, joinedAt, salary } = worker
        const yearDiff = this.getYearDiff(joinedAt, checkDate)
        const totalBonus = parseFloat(role.bonusPerYear) * yearDiff
        const ownBonus = totalBonus > role.bonusPerYearCap ? role.bonusPerYearCap : totalBonus
        const hiringBonus = await this.recursiveGetSubordinatesBonus([worker], worker.role)

        return salary + ((ownBonus / 100) * salary) + hiringBonus
    }

    getYearDiff(startDate: Date, endDate: Date): number {
        return Math.abs(new Date(endDate).getFullYear() - new Date(startDate).getFullYear());
    }

    async recursiveGetSubordinatesBonus(workers: Worker[], role: Role, sum = 0): Promise<number> {
        if (!workers.length) {
            return sum
        }
        const workersMapping = workers.reduce((acc, worker) => {
            const { hires } = worker
            hires.reduce((levelAcc, hired) => {
                return levelAcc + hired.salary * parseFloat(role.bonusPerSubordinate) / 100}, 0)
            return {
                hiringBonus: acc.hiringBonus + hires.reduce((levelAcc, hired) =>
                   levelAcc + hired.salary * parseFloat(role.bonusPerSubordinate) / 100, 0),
                hiresIds: acc.hiresIds.concat(hires.map(hired => hired.id))
            }
        }, { hiringBonus: sum, hiresIds: [] })

        const nestedSubordinates = await this.workerRepository.find({
            where: { id: In(workersMapping.hiresIds) },
            relations: ['hires']
        })
        return this.recursiveGetSubordinatesBonus(nestedSubordinates, role, workersMapping.hiringBonus)
    }
}