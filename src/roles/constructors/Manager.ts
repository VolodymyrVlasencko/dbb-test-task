import { RoleConstructor } from "./RoleConstructor";
import { Worker } from "../../entities/workers.entity";

export class ManagerService implements RoleConstructor {
    countWorkerSalary(worker: Worker, checkDate: Date): number {
        const { hires, role, joinedAt, salary } = worker
        const yearDiff = this.getYearDiff(joinedAt, checkDate)
        const totalBonus = parseFloat(role.bonusPerYear) * yearDiff
        const ownBonus = totalBonus > role.bonusPerYearCap ? role.bonusPerYearCap : totalBonus
        const hiringBonus = hires.reduce((acc, hired) => acc + hired.salary * parseFloat(role.bonusPerSubordinate) / 100, 0)

        return salary + ((ownBonus / 100) * salary) + hiringBonus
    }

    getYearDiff(startDate: Date, endDate: Date) {
        return Math.abs(new Date(endDate).getFullYear() - new Date(startDate).getFullYear());
    }
}