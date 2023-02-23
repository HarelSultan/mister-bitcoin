import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'login-signup-page',
  templateUrl: './login-signup-page.component.html',
  styleUrls: ['./login-signup-page.component.scss'],
})
export class LoginSignupPageComponent {
  form!: FormGroup;
  isSignup: boolean = true;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location
  ) {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: [''],
    });
  }

  async onLoginSignup() {
    console.log(this.form.value);
    const { username, password } = this.form.value;
    try {
      (await this.isSignup)
        ? this.userService.signup(this.form.value)
        : this.userService.login(username, password);
      this.location.back();
    } catch (err) {
      console.log(err);
    }
  }

  onToggleLoginSignup() {
    this.isSignup = !this.isSignup;
    this.form.reset();
  }

  get formControl() {
    return this.form.controls;
  }
}
