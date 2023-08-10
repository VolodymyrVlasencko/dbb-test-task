import { RoleConstructor } from "./RoleConstructor";
import { Worker } from "../../entities/workers.entity";

export class EmployeeService implements RoleConstructor {
    countWorkerSalary(worker: Worker, checkDate: Date): number {
        const { role, joinedAt, salary } = worker
        const yearDiff = this.getYearDiff(joinedAt, checkDate)
        const totalBonus = parseFloat(role.bonusPerYear) * yearDiff
        const ownBonus = totalBonus > role.bonusPerYearCap ? role.bonusPerYearCap : totalBonus

        return salary + ((ownBonus / 100) * salary)
    }

    getYearDiff(startDate: Date, endDate: Date): number {
        return Math.abs(new Date(endDate).getFullYear() - new Date(startDate).getFullYear());
    }
}