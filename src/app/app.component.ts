import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VacationType } from './Models/Vacations/VacationType';
import { VacationsService } from './Services/vacations.service';
import { EmployeeService } from './Services/employee.service';
import { MatSelectChange } from '@angular/material/select';
import { EmployeesReadDto } from './Models/Employees/EmployeesReadDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private vacationsService: VacationsService, private employeeService: EmployeeService) { }
  ngOnInit(): void {
    this.loadEmployess();
  
  }
  form = new FormGroup({
    vacationType: new FormControl<VacationType>(VacationType.Annual),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
  });
  deductedDuration = 0;
  annualBalance = 0;
  sickBalance = 0;
  isEmployeeIdEntered = false;
  currentEmployeeId = 0;
  allEmployees:EmployeesReadDto[]=[];
  CalculateDeductedDuration() {
    console.log(this.deductedDuration);
    let startdate = this.form.controls.startDate.value;
    let enddate = this.form.controls.endDate.value;
    if (!startdate || !enddate) {
      return;
    }
    this.vacationsService.CalculateDeductedDuration({ startDate: startdate, endDate: enddate })
      .subscribe(x => { this.deductedDuration = x.balance });
  }
  submitVacation(e: Event) {
    e.preventDefault();
    if (this.form.invalid) {
      return;
    }
    this.vacationsService.create({
      employeeId: this.currentEmployeeId,
      startDate: this.adjustDate(this.form.controls.startDate.value!),
      endDate: this.adjustDate(this.form.controls.endDate.value!),
      vacationType: this.form.controls.vacationType.value!
    }).subscribe(x => { this.loadBalance() });

  }
  adjustDate(date: Date) {
    date.setTime(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
    return date;
  }
  loadBalance() {
    this.employeeService.showBalance(this.currentEmployeeId).subscribe(x => {
      this.annualBalance = x.annualBalance;
      this.sickBalance = x.sickBalance;
    });

  }
  setUserId(e: MatSelectChange) {
    this.currentEmployeeId = e.value
    this.isEmployeeIdEntered =true;
    this.loadBalance();

  }
  loadEmployess ()
  {
    this.employeeService.getEmployees().subscribe(x=>{this.allEmployees=x});
  }

}
