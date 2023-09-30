import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

export function MatchPaswordValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AccountService: AccountService
  ) {}

  registerForm = this.fb.group(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])[a-zd]*(?=.*[^A-Za-z0-9]{2,}).{8,}$'),
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: MatchPaswordValidator('password', 'confirmPassword') }
  );

  ngOnInit() {}

  backToLogin() {
    console.log('backToLogin');
    this.router.navigate(['/']);
  }

  submitForm() {
    console.log('Submitted');
    this.AccountService.register(this.registerForm.value);
  }
}
