import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  passwordMatchValidator,
  passwordValidator,
} from './passwordValidator.validator';
import { take } from 'rxjs';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService],
})
export class SignupComponent {
  @ViewChild('password') passwordField!: ElementRef;
  @ViewChild('rePassword') rePasswordField!: ElementRef;

  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'fr', viewValue: 'French' },
  ];
  countries = [
    { value: 'us', viewValue: 'United States' },
    { value: 'nl', viewValue: 'Netherlands' },
  ];

  showPassword: boolean = false;

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      passwordValidator(),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      passwordMatchValidator('password', 'rePassword'),
    ]),
    language: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly signupService: SignupService
  ) {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService
        .signup(this.signupForm.value)
        .subscribe((res: boolean) => {
          if (res) {
            this.signupForm.reset('');
            this.router.navigate(['/home']);
          } else {
            throw new Error('Signup failed');
          }
        });
    }
  }

  checkEmail() {
    const userEmail = this.signupForm.value.email;

    if (userEmail && this.signupForm.controls['email'].valid) {
      this.signupService
        .checkEmail(userEmail)
        .pipe(take(1))
        .subscribe((res: boolean) => {
          if (res) {
            this.signupForm.controls['email'].setErrors({ emailExists: true });
          }
        });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;

    // if (id === 'password') {
    if (this.showPassword) {
      this.passwordField.nativeElement.setAttribute('type', 'text');
      this.rePasswordField.nativeElement.setAttribute('type', 'text');
    } else {
      this.passwordField.nativeElement.setAttribute('type', 'password');
      this.rePasswordField.nativeElement.setAttribute('type', 'password');
    }
    // } else {
    // if (this.showPassword) {
    // } else {
    // }
    // }
  }
}
