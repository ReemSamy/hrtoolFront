import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VacationType } from './Models/Vacations/VacationType';
import { VacationsService } from './Services/vacations.service';
import { EmployeeService } from './Services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private vacationsService: VacationsService, private employeeService: EmployeeService) { }
  ngOnInit(): void {
    this.loadBalance();
  }
  form = new FormGroup({
    vacationType: new FormControl<VacationType>(VacationType.Annual),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
  });
  deductedDuration = 0;
  annualBalance = 0;
  sickBalance = 0;
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
      employeeId: 1,
      startDate: this.adjustDate(this.form.controls.startDate.value!),
      endDate: this.adjustDate(this.form.controls.endDate.value!),
      vacationType: this.form.controls.vacationType.value!
    }).subscribe(x=>{this.loadBalance()});

  }
  adjustDate(date: Date) {
    date.setTime(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
    return date;
  }
  loadBalance() {
    this.employeeService.showBalance(1).subscribe(x => {
      this.annualBalance = x.annualBalance;
      this.sickBalance = x.sickBalance;
    });

  }

}
