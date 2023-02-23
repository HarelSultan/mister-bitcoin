import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { MoveModel } from 'src/app/models/move.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  private _loggedInUser$ = new BehaviorSubject<User | null>(
    JSON.parse(sessionStorage.getItem('loggedinUser')!)
  );
  public loggedInUser$ = this._loggedInUser$.asObservable();

  private storageKey: string = 'user_DB';
  private sessionKey: string = 'loggedinUser';

  getUser() {
    const user = this._loggedInUser$.value;
    return of(user);
  }

  signup(userToSave: User) {
    userToSave._id = this.makeId();
    userToSave.coins = 100;
    userToSave.moves = [];

    let users = this.getUsers() || [];
    users.push(userToSave);
    this.saveUsers(users);
    this.saveLocalUser(userToSave);
    return this._loggedInUser$.next(userToSave);
  }

  login(username: string, password: string) {
    const users: User[] = this.getUsers();
    return new Promise((res, rej) => {
      if (users) {
        const user: User | undefined = users.find(
          (user) => user.username === username && user.password === password
        );
        if (!user) return rej('Invalid username or password');
        this._loggedInUser$.next(user);
        this.saveLocalUser(user);
        res(user);
      }
      rej('User not exists');
    });
  }

  updateUserCoins(transferedTo: Contact, decreaseBy: number) {
    const loggedinUser = JSON.parse(sessionStorage.getItem(this.sessionKey)!);
    const users: User[] = this.getUsers();
    const userIdx = users.findIndex((user) => user._id === loggedinUser._id);

    return new Promise((res, rej) => {
      if (loggedinUser.coins < decreaseBy) {
        const status = 'declined';
        this.addMove(transferedTo, decreaseBy, loggedinUser, status);
        rej(`Transfer failed, coins balance is: ${loggedinUser.coins}`);
      }

      const updatedUser = this.addMove(transferedTo, decreaseBy, loggedinUser);
      updatedUser.coins -= decreaseBy;
      users.splice(userIdx, 1, updatedUser);

      this.saveUsers(users);
      this.saveLocalUser(updatedUser);
      this._loggedInUser$.next(updatedUser);
      res(updatedUser);
    });
  }

  logout() {
    this._loggedInUser$.next(null);
    sessionStorage.removeItem(this.sessionKey);
  }

  addMove(
    contact: Contact,
    amount: number,
    loggedinUser: User,
    status: string = 'approved'
  ) {
    const balance =
      status === 'approved' ? loggedinUser.coins - amount : loggedinUser.coins;
    const move: MoveModel = {
      to: contact.name,
      toId: contact._id!,
      at: new Date(),
      amount,
      balance,
      status,
    };
    loggedinUser.moves.push(move);
    return loggedinUser;
  }

  getMoves(toContactId: string = '') {
    const loggedinUser = JSON.parse(sessionStorage.getItem(this.sessionKey)!);
    if (toContactId) {
      return loggedinUser.moves.filter(
        (move: MoveModel) => move.toId === toContactId
      );
    }
    return loggedinUser.moves;
  }

  getUsers() {
    const users: any = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : undefined;
  }

  saveUsers(users: User[]) {
    console.log(users);

    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  saveLocalUser(userToSave: User) {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(userToSave));
  }

  makeId(length = 6) {
    var txt = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
  }
}
