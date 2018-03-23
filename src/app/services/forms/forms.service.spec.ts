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
    // Arrange
    const form = service.calcForm();

    // Assert
    expect(form.valid).toBe(false);
  });

  it('expect form is invalid wiht out secondArg', () => {
    // Arrange
    const form = service.calcForm();
    
    // Act
    form.get('firstArg').setValue(10);

    // Assert
    expect(form.valid).toBe(false);
  });

  it('expect form is invalid wiht out firstArg', () => {
    // Arrange
    const form = service.calcForm();
    
    // Act
    form.get('secondArg').setValue(10);

    // Assert
    expect(form.valid).toBe(false);
  });

  it('expect form is valid wiht two args', () => {
    // Arrange
    const form = service.calcForm();

    // Act
    form.get('firstArg').setValue(10);
    form.get('secondArg').setValue(10);

    // Assert
    expect(form.valid).toBe(true);
  });
});
