import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateVacationDto } from '../Models/Vacations/CreateVacationDto';
import { Observable } from 'rxjs';
import { CreateVacationResultDto } from '../Models/Vacations/CreateVacationResultDto';
import { CalculateDurationDto } from '../Models/Vacations/CalculateDurationDto';
import { CalculateBalanceDto } from '../Models/Vacations/CalculateBalanceDto';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {

  constructor(private client: HttpClient) {

  }
  public create(vacationRequest: CreateVacationDto): Observable<CreateVacationResultDto> {
    return this.client.post<CreateVacationResultDto>("https://localhost:7149/api/Vacation", vacationRequest);
  }
  public CalculateDeductedDuration(input: CalculateDurationDto): Observable<CalculateBalanceDto> {
    return this.client.post<CalculateBalanceDto>("https://localhost:7149/api/Vacation/calculate-Balance", input);
  }
}
