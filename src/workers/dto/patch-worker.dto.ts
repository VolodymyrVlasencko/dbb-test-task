import { IsNumber, IsString } from "class-validator";

export class PatchWorkerDto {
    @IsString()
    name?: string;

    @IsNumber()
    sallary?: number;
    
    @IsNumber()
    hiredById?: number;    
    
    @IsNumber()
    roleId?: number;
}