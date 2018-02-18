import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class UsersApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = 'https://5a2762ec84a17f0012a945b2.mockapi.io/persons';

    return this.http.get<User[]>(url);
  }
}
