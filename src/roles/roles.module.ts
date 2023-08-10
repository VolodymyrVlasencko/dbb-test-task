import { Module } from '@nestjs/common';
import { EmployeeService } from './constructors/Employee';
import { RolesService } from './roles.service';
import { ManagerService } from './constructors/Manager';
import { SalesService } from './constructors/Sales';
import { WorkerRepository } from '../workers/workers.repository';

@Module({
    providers: [EmployeeService, ManagerService, SalesService, RolesService, WorkerRepository],
})
export class RolesModule {}
