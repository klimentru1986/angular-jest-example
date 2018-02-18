import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CalcOperators } from '../../enums/calc-operators.enum';
import { CalcComponent } from './calc.component';
import { ObjToArrPipe } from '../../pipes/obj-to-arr.pipe';
import { CalcService } from '../../services/calc/calc.service';
import { FormsService } from '../../services/forms/forms.service';

describe('CalcComponent', () => {
  let comp: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;
  let formsServiceStub;
  let calcServiceStub;

  @Pipe({ name: 'objToArr' })
  class PipeMock implements PipeTransform {
    transform(value) {
      return [];
    }
  }

  beforeEach(() => {
    formsServiceStub = {
      calcForm: () => new FormGroup({})
    };

    calcServiceStub = {
      calculate: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [CalcComponent, PipeMock],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FormsService, useValue: formsServiceStub },
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
    const spy = jest.spyOn(comp, 'calculate');
    const el = fixture.debugElement.nativeElement;
    const button = el.querySelector('button.submit');

    fixture.detectChanges();
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });

  it('should call calcService on calculate', () => {
    const ev = new Event('submit');
    const calcService = fixture.debugElement.injector.get(CalcService);
    const calcSpy = jest.spyOn(calcService, 'calculate');

    fixture.detectChanges();
    comp.calculate(ev);

    expect(calcSpy).toHaveBeenCalled();
  });

  it('should update result', () => {
    const ev = new Event('submit');
    const result = 10;
    const calcService = fixture.debugElement.injector.get(CalcService);
    const calcSpy = jest.spyOn(calcService, 'calculate').mockReturnValue(result);

    fixture.detectChanges();
    comp.calculate(ev);

    expect(comp.result).toEqual(result);
  });

  it('should render result', () => {
    const ev = new Event('submit');
    const result = 10;
    const resultEl = fixture.debugElement.nativeElement.querySelector('div.result');
    const calcService = fixture.debugElement.injector.get(CalcService);
    const calcSpy = jest.spyOn(calcService, 'calculate').mockReturnValue(result);

    fixture.detectChanges();
    comp.calculate(ev);
    fixture.detectChanges();
    const content = resultEl.textContent;

    expect(content).toEqual(result.toString());
  });
});
