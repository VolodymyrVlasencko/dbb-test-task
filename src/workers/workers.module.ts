import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerRepository } from './workers.repository';
import { Worker } from '../entities/workers.entity';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';
import { EmployeeService } from '../roles/constructors/Employee';
import { ManagerService } from '../roles/constructors/Manager';
import { SalesService } from '../roles/constructors/Sales';

@Module({
  imports: [TypeOrmModule.forFeature([Worker]), RolesModule],
  providers: [WorkersService, WorkerRepository, RolesService, EmployeeService, ManagerService, SalesService],
  controllers: [WorkersController]
})
export class WorkersModule {}
