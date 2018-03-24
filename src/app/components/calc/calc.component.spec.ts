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
    // Assert
    expect(comp).toBeTruthy();
  });

  it('calcOperators defaults to: CalcOperators', () => {
    // Assert
    expect(comp.calcOperators).toEqual(CalcOperators);
  });

  it('should initForm', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(comp.form instanceof FormGroup).toBe(true);
  });

  it('should call calculate on submit', () => {
    // Arrange
    const spy = jest.spyOn(comp, 'calculate');
    const el = fixture.debugElement.nativeElement;
    const button = el.querySelector('button.submit');

    // Act
    fixture.detectChanges();
    button.dispatchEvent(new Event('click'));

    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should call calcService on calculate', () => {
    // Arrange
    const ev = new Event('submit');
    const calcService = fixture.debugElement.injector.get(CalcService);
    const calcSpy = jest.spyOn(calcService, 'calculate');

    // Act
    fixture.detectChanges();
    comp.calculate(ev);

    // Assert
    expect(calcSpy).toHaveBeenCalled();
  });

  it('should update result', () => {
    // Arrange
    const ev = new Event('submit');
    const result = 10;
    const calcService = fixture.debugElement.injector.get(CalcService);

    // Act
    const calcSpy = jest
      .spyOn(calcService, 'calculate')
      .mockReturnValue(result);
    fixture.detectChanges();
    comp.calculate(ev);

    // Assert
    expect(comp.result).toEqual(result);
  });

  it('should render result', () => {
    // Arrange
    const ev = new Event('submit');
    const result = 10;
    const resultEl = fixture.debugElement.nativeElement.querySelector(
      'div.result'
    );
    const calcService = fixture.debugElement.injector.get(CalcService);

    // Act
    const calcSpy = jest
      .spyOn(calcService, 'calculate')
      .mockReturnValue(result);
    fixture.detectChanges();
    comp.calculate(ev);
    fixture.detectChanges();
    const content = resultEl.textContent;

    // Assert
    expect(content).toEqual(result.toString());
  });
});
