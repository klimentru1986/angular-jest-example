import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { UsersApiService } from '../../services/users-api/users-api.service';
import { UsersListComponent } from './users-list.component';

import { of } from 'rxjs/observable/of';
import { User } from '../../models/user.model';
import { userInfo } from 'os';
import { By } from '@angular/platform-browser';

describe('UsersListComponent', () => {
  let comp: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let expectedUsers: User[];
  let usersApiServiceStubInjector: UsersApiService;

  @Directive({
    selector: 'app-user-details'
  })
  class UserDetailsMockComponent {
    @Input() userInfo;
  }

  beforeEach(() => {
    expectedUsers = [
      { id: '5a276e9b174e685a77674d49', age: 38, name: 'Pruitt Ramirez' },
      { id: '5a276e9b6561a2e06f682b9c', age: 33, name: 'Tabitha Dickson' }
    ];

    const usersApiServiceStubIInjector = {
      getUsers: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [UsersListComponent, UserDetailsMockComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UsersApiService, useValue: usersApiServiceStubIInjector }
      ]
    });

    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;

    usersApiServiceStubInjector = fixture.debugElement.injector.get(
      UsersApiService
    );
    jest
      .spyOn(usersApiServiceStubInjector, 'getUsers')
      .mockReturnValue(of(expectedUsers));
  });

  it('can load instance', () => {
    // Assert
    expect(comp).toBeTruthy();
  });

  it('should call usersApiService', () => {
    // Act
    spyOn(usersApiServiceStubInjector, 'getUsers');
    fixture.detectChanges();

    // Assert
    expect(usersApiServiceStubInjector.getUsers).toHaveBeenCalled();
  });

  it('should render mock users', () => {
    // Arrange
    const el: HTMLElement = fixture.debugElement.nativeElement.querySelector(
      'table'
    );

    // Act
    fixture.detectChanges();
    const elHtml = el.innerHTML;

    // Assert
    expect(elHtml).toContain(expectedUsers[0].id);
    expect(elHtml).toContain(expectedUsers[0].name);
    expect(elHtml).toContain(expectedUsers[0].age);
    expect(elHtml).toContain(expectedUsers[1].id);
    expect(elHtml).toContain(expectedUsers[1].name);
    expect(elHtml).toContain(expectedUsers[1].age);
  });

  it('should renders correctly', () => {
    // Act
    fixture.detectChanges();
    const elHtml = fixture.nativeElement;

    // Assert
    expect(elHtml).toMatchSnapshot();
  });

  it('should input firtst user to user info', () => {
    // Act
    fixture.detectChanges();
    const childDebugElement = fixture.debugElement.query(
      By.directive(UserDetailsMockComponent)
    );
    const mockUserInfoComp = childDebugElement.injector.get(
      UserDetailsMockComponent
    ) as UserDetailsMockComponent;

    // Assert
    expect(mockUserInfoComp.userInfo).toEqual(expectedUsers[0]);
  });
});
