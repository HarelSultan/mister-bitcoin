import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<User | null> {
  constructor(private userService: UserService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | null> {
    return this.userService
      .getUser()
      .pipe(tap((user) => user || this.router.navigateByUrl('/auth')));
  }
}
