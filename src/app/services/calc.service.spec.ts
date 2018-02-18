import { CalcService } from './calc.service';
import { CalcOperators } from '../enums/calc-operators.enum';

describe('CalcService', () => {
  let service: CalcService;
  const getExpectedArgs = (operator: CalcOperators) => {
    return {
      firstArg: 20,
      secondArg: 4,
      operator: operator
    };
  };

  beforeEach(() => {
    service = new CalcService();
  });

  it('should plus calculate', () => {
    const mock = getExpectedArgs(CalcOperators.plus);

    expect(service.calculate(mock)).toEqual(24);
  });

  it('should minus calculate', () => {
    const mock = getExpectedArgs(CalcOperators.minus);

    expect(service.calculate(mock)).toEqual(16);
  });

  it('should multiply calculate', () => {
    const mock = getExpectedArgs(CalcOperators.multiply);

    expect(service.calculate(mock)).toEqual(80);
  });

  it('should divide calculate', () => {
    const mock = getExpectedArgs(CalcOperators.divide);

    expect(service.calculate(mock)).toEqual(5);
  });
});
