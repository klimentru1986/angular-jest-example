import { FormsService } from './forms.service';
import { FormBuilder } from '@angular/forms';

describe('FormsService', () => {
  let service: FormsService;
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
    service = new FormsService(fb);
  });

  it('expect form is invalid wiht out args', () => {
    const form = service.calcForm();

    expect(form.valid).toBe(false);
  });

  it('expect form is invalid wiht out secondArg', () => {
    const form = service.calcForm();
    form.get('firstArg').setValue(10);

    expect(form.valid).toBe(false);
  });

  it('expect form is invalid wiht out firstArg', () => {
    const form = service.calcForm();
    form.get('secondArg').setValue(10);

    expect(form.valid).toBe(false);
  });

  it('expect form is valid wiht two args', () => {
    const form = service.calcForm();
    form.get('firstArg').setValue(10);
    form.get('secondArg').setValue(10);

    expect(form.valid).toBe(true);
  });
});
