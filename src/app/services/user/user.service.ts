import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private _userDb: User[] = [
    {
      _id: 'a101',
      name: 'Puki Ba',
      coins: 100,
      moves: [],
    },
  ];

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  getUser() {
    return this._userDb[0];
  }
}
