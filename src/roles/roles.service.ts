import { Inject, Injectable } from '@nestjs/common';
import { RoleConstructor } from './constructors/RoleConstructor';
import { Worker } from '../entities/workers.entity';
import { EmployeeService } from './constructors/Employee';
import { RoleNames } from './role.model'; 
import { ManagerService } from './constructors/Manager';
import { SalesService } from './constructors/Sales';

@Injectable()
export class RolesService {
    constructor(
        @Inject(EmployeeService)
        private readonly employeeService: EmployeeService,
        @Inject(ManagerService)
        private readonly managerService: ManagerService,
        @Inject(SalesService)
        private readonly salesService: SalesService
    ) {}

    getRoleInstance(worker: Worker): RoleConstructor {
        if (worker.role.name === RoleNames.Employee) {
            return this.employeeService
        }
        if (worker.role.name === RoleNames.Manager) {
            return this.managerService
        }
        if (worker.role.name === RoleNames.Sales) {
            return this.salesService
        }
    }
}
