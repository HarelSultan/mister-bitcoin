import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  user: User | null = null;
  subscription!: Subscription;
  @Output() onToggleMenuDisplay = new EventEmitter();
  ngOnInit(): void {
    this.subscription = this.userService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  toggleMenuDisplay() {
    this.onToggleMenuDisplay.emit();
  }
  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/auth');
  }
}
