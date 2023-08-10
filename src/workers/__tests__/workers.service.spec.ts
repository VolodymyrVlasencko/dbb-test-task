import { Test, TestingModule } from '@nestjs/testing';
import { WorkersService } from '../workers.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { RolesModule } from '../../roles/roles.module';
import { RolesService } from '../../roles/roles.service';
import { EmployeeService } from '../../roles/constructors/Employee';
import { ManagerService } from '../../roles/constructors/Manager';
import { SalesService } from '../../roles/constructors/Sales';
import { Worker } from '../../entities/workers.entity';
import { WorkerRepository } from '../workers.repository';
import { typeORMConfig } from '../../../database/config/typeorm.config';

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  DataSource: jest.fn()
}))

describe('WorkersService', () => {
  let service: WorkersService;
  let workerRepository: WorkerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Worker]),
        RolesModule, 
        TypeOrmModule.forRoot(typeORMConfig),
      ],
      providers: [
        {
          provide: getRepositoryToken(Worker),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn()
          }
        },
        WorkersService,
        RolesService,
        EmployeeService,
        ManagerService,
        SalesService
      ]
    }).compile();

    service = module.get<WorkersService>(WorkersService);
    workerRepository = module.get<WorkerRepository>(getRepositoryToken(Worker))
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
