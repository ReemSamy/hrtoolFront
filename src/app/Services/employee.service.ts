import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RemainingBalanceDto } from '../Models/Employees/RemainingBalanceDto';
import { Observable } from 'rxjs';
import { EmployeesReadDto } from '../Models/Employees/EmployeesReadDto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private client: HttpClient) { }
  showBalance(employeeId:number): Observable<RemainingBalanceDto>
  {

    return this.client.get<RemainingBalanceDto>(`https://localhost:7149/api/Employee/AnnualBalance/${employeeId}`);
  }
  getEmployees():Observable<EmployeesReadDto[]>
  {
    return this.client.get<EmployeesReadDto[]>("https://localhost:7149/api/Employee");
  }
}
