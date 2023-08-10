import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWorkerDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    sallary: number;
    
    @IsNotEmpty()
    @IsNumber()
    roleId: number;

    hiredById: number;
}