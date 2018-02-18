import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CalcOperators } from '../../enums/calc-operators.enum';
import { CalcComponent } from './calc.component';
import { ObjToArrPipe } from '../../pipes/obj-to-arr.pipe';
import { CalcService } from '../../services/calc.service';

describe('CalcComponent', () => {
  let comp: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;
  let formBuilderStub;
  let calcServiceStub;

  @Pipe({ name: 'objToArr' })
  class PipeMock implements PipeTransform {
    transform(value) {
      return [];
    }
  }

  beforeEach(() => {
    formBuilderStub = {
      group: () => new FormGroup({})
    };

    calcServiceStub = {
      calculate: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [CalcComponent, PipeMock],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: CalcService, useValue: calcServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CalcComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('calcOperators defaults to: CalcOperators', () => {
    expect(comp.calcOperators).toEqual(CalcOperators);
  });

  it('should initForm', () => {
    fixture.detectChanges();

    expect(comp.form instanceof FormGroup).toBe(true);
  });

  it('should call calculate on submit', () => {
    const el = fixture.debugElement.nativeElement;
    const spy = jest.spyOn(comp, 'calculate');
    const button = el.querySelector('button.submit');

    fixture.detectChanges();
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });

  it('should call calcService on calculate', () => {
    const calcService = fixture.debugElement.injector.get(CalcService);
    const calcSpy = jest.spyOn(calcService, 'calculate');
    const ev = new Event('submit');

    fixture.detectChanges();
    comp.calculate(ev);

    expect(calcSpy).toHaveBeenCalled();
  });

  it('should update result', () => {
    const calcService = fixture.debugElement.injector.get(CalcService);
    const result = 10;
    const calcSpy = jest.spyOn(calcService, 'calculate').mockReturnValue(result);
    const ev = new Event('submit');

    fixture.detectChanges();
    comp.calculate(ev);

    expect(comp.result).toEqual(result);
  });

  it('should render result', () => {
    const calcService = fixture.debugElement.injector.get(CalcService);
    const result = 10;
    const calcSpy = jest.spyOn(calcService, 'calculate').mockReturnValue(result);
    const ev = new Event('submit');
    const resultEl = fixture.debugElement.nativeElement.querySelector('div.result');

    fixture.detectChanges();
    comp.calculate(ev);
    fixture.detectChanges();
    const content = resultEl.textContent;

    expect(content).toEqual(result.toString());
  });
});
