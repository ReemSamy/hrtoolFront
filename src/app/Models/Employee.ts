import { VacationRequest } from "./VacationRequest";
import {Vacation} from './Vacations'
export interface Employee
{
    id: number;
    name: string;
    balance: number;
    vacationRequests: VacationRequest[];
    vacations: Vacation[];  
}