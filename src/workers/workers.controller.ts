import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { Worker } from '../entities/workers.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { PatchWorkerDto } from './dto/patch-worker.dto';

@Controller('workers')
export class WorkersController {
    constructor(
        private workersService: WorkersService
    ) {}

    @Get('/:id')
    getWorkerById(@Param('id') id: number, @Query('date') date: Date): Promise<Worker> {
        return this.workersService.getWorkerById(id, date)
    }

    @Get()
    getAllWorkers(@Query('date') date: Date): Promise<{ workers: Worker[], totalSalary: number }> {
        return this.workersService.getAllWorkers(date)
    }

    @Post()
    createWorker(@Body() createWorkerDto: CreateWorkerDto): Promise<Worker> {
        return this.workersService.createWorker(createWorkerDto)
    }

    @Delete('/:id')
    deleteWorkerById(@Param('id') id: number): Promise<unknown> {
        return this.workersService.deleteWorker(id)
    }

    @Patch('/:id')
    updateWorker(@Param('id') id: number, @Body() patchWorkerDto: PatchWorkerDto): Promise<Worker> {
        return this.workersService.updateWorker(id, patchWorkerDto)
    }
}
