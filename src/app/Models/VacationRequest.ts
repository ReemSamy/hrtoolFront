import { Employee } from "./Employee";

export interface VacationRequest {
    id: number;
    employeeId: number;
    startDate: Date;
    endDate: Date;
    vacationType: string;
    duration: number;
    employee?: Employee;
  }