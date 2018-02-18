import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalcOperators } from '../../enums/calc-operators.enum';
import { CalcService } from '../../services/calc.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  public form: FormGroup;
  public result: number;
  public calcOperators = CalcOperators;
  constructor(private fb: FormBuilder, private calcService: CalcService) {}

  ngOnInit() {
    this.form = this.initForm();
  }

  public calculate(ev: Event): void {
    ev.preventDefault();
    const formValue = this.form.value;
    this.result = this.calcService.calculate(formValue);
  }

  private initForm(): FormGroup {
    return this.fb.group({
      firstArg: [null, [Validators.required]],
      secondArg: [null, [Validators.required]],
      operator: [CalcOperators.plus, [Validators.required]]
    });
  }
}
