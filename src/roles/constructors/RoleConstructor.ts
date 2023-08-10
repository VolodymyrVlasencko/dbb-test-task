import { Worker } from "../../entities/workers.entity";

export abstract class RoleConstructor {
    
    abstract countWorkerSalary: (worker: Worker, checkDate: Date) => number | Promise<number>;

    abstract getYearDiff: (startDate: Date, endDate: Date) => number;

    abstract recursiveGetSubordinates?: (recursiveGetSubordinatesBonus: Worker, sum: number) => number | Promise<number>;

}