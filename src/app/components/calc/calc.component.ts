import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalcOperators } from '../../enums/calc-operators.enum';
import { CalcService } from '../../services/calc/calc.service';
import { FormsService } from '../../services/forms/forms.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  public form: FormGroup;
  public result: number;
  public calcOperators = CalcOperators;
  constructor(private formService: FormsService, private calcService: CalcService) {}

  ngOnInit() {
    this.form = this.formService.calcForm();
  }

  public calculate(ev: Event): void {
    ev.preventDefault();
    const formValue = this.form.value;
    this.result = this.calcService.calculate(formValue);
  }
}
