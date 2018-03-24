import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let comp: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(UserDetailsComponent);
    comp = fixture.componentInstance;
    comp.userInfo = {
      id: 'qwe123',
      name: 'Иванов Иван Иванович',
      age: 33
    };
  });

  it('can load instance', () => {
    // Assert
    expect(comp).toBeTruthy();
  });

  it('should renders correctly', () => {
    // Act
    fixture.detectChanges();
    const elHtml = fixture.nativeElement;

    // Assert
    expect(elHtml).toMatchSnapshot();
  });
});
