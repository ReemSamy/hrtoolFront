import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RemainingBalanceDto } from '../Models/Employees/RemainingBalanceDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private client: HttpClient) { }
  showBalance(employeeId:number): Observable<RemainingBalanceDto>
  {

    return this.client.get<RemainingBalanceDto>(`https://localhost:7149/api/Employee/AnnualBalance/${employeeId}`);
  }
}
