import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersApiService } from '../../services/users-api/users-api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private usersApi: UsersApiService) {}

  ngOnInit() {
    this.users$ = this.usersApi.getUsers();
  }
}
