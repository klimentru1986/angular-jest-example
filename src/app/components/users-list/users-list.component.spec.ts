import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UsersApiService } from '../../services/users-api/users-api.service';
import { UsersListComponent } from './users-list.component';

import { of } from 'rxjs/observable/of';
import { User } from '../../models/user.model';

describe('UsersListComponent', () => {
  let comp: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let expectedUsers: User[];

  beforeEach(() => {
    expectedUsers = [
      { id: '5a276e9b174e685a77674d49', age: 38, name: 'Pruitt Ramirez' },
      { id: '5a276e9b6561a2e06f682b9c', age: 33, name: 'Tabitha Dickson' }
    ];

    const usersApiServiceStub = {
      getUsers: () => {}
    };
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: UsersApiService, useValue: usersApiServiceStub }]
    });
    fixture = TestBed.createComponent(UsersListComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('makes expected calls', () => {
    const usersApiServiceStub: UsersApiService = fixture.debugElement.injector.get(UsersApiService);
    spyOn(usersApiServiceStub, 'getUsers');
    fixture.detectChanges();

    expect(usersApiServiceStub.getUsers).toHaveBeenCalled();
  });

  it('should render mock users', async () => {
    const el: HTMLElement = fixture.debugElement.nativeElement.querySelector('table');
    const usersApiServiceStub: UsersApiService = fixture.debugElement.injector.get(UsersApiService);
    jest.spyOn(usersApiServiceStub, 'getUsers').mockReturnValue(of(expectedUsers));

    fixture.detectChanges();
    const elHtml = el.innerHTML;

    expect(elHtml).toContain(expectedUsers[0].id);
    expect(elHtml).toContain(expectedUsers[0].name);
    expect(elHtml).toContain(expectedUsers[0].age);
    expect(elHtml).toContain(expectedUsers[1].id);
    expect(elHtml).toContain(expectedUsers[1].name);
    expect(elHtml).toContain(expectedUsers[1].age);
  });
});
