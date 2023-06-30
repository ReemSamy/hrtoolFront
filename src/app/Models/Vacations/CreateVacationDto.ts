import { VacationType } from "./VacationType";

export interface CreateVacationDto {
    employeeId: number;
    startDate: Date;
    endDate: Date;
    vacationType: VacationType;
}