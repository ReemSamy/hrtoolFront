import { Employee } from "./Employee";

export interface Vacation {
    id: number;
    employeeId: number;
    startDate: Date;
    endDate: Date;
   // vacationDays: VacationDay[];
    employee?: Employee;
  }