import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mister-bitcoin';

  isMenuDisplayed: boolean = false;

  onToggleMenuDisplay() {
    this.isMenuDisplayed = !this.isMenuDisplayed;
  }
}
