import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalcOperators } from '../../enums/calc-operators.enum';

@Injectable()
export class FormsService {
  constructor(private fb: FormBuilder) {}

  calcForm(): FormGroup {
    return this.fb.group({
      firstArg: [null, [Validators.required]],
      secondArg: [null, [Validators.required]],
      operator: [CalcOperators.plus, [Validators.required]]
    });
  }
}
