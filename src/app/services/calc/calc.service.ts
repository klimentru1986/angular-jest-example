import { Injectable } from '@angular/core';
import { CalcOperators } from '../../enums/calc-operators.enum';

@Injectable()
export class CalcService {
  constructor() {}

  public calculate(res: { firstArg: number; secondArg: number; operator: CalcOperators }): number {
    if (!res || !res.firstArg || !res.secondArg || !res.operator) {
      return;
    }

    switch (res.operator) {
      case CalcOperators.plus:
        return res.firstArg + res.secondArg;
      case CalcOperators.minus:
        return res.firstArg - res.secondArg;
      case CalcOperators.multiply:
        return res.firstArg * res.secondArg;
      case CalcOperators.divide:
        return res.firstArg / res.secondArg;
      default:
        return null;
    }
  }
}
