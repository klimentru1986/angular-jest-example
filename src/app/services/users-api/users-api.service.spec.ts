import { UsersApiService } from './users-api.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpRequest } from '@angular/common/http';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let backend: HttpTestingController;
  let expectedUsers;

  beforeEach(() => {
    expectedUsers = [
      { id: '5a276e9b174e685a77674d49', age: 38, name: 'Pruitt Ramirez' },
      { id: '5a276e9b6561a2e06f682b9c', age: 33, name: 'Tabitha Dickson' }
    ];

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UsersApiService]
    });

    backend = TestBed.get(HttpTestingController);
    service = TestBed.get(UsersApiService);

    // Mock implementation of console.error to
    // return undefined to stop printing out to console log during test
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(
    inject([HttpTestingController], (_backend: HttpTestingController) => {
      _backend.verify();
    })
  );

  it('should create an instance successfully', () => {
    // Assert
    expect(service).toBeDefined();
  });

  it('should call the GET api and return the result', () => {
    // Arrange
    let actualData = null;

    // Act
    service.getUsers().subscribe(data => (actualData = data));
    backend
      .expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET users data`)
      .flush(expectedUsers);
      
    // Assert
    expect(actualData).toEqual(expectedUsers);
  });
});
