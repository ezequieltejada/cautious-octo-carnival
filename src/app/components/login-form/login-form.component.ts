import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppActions } from '../../state/app/app.actions';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Login</h1>
    <a class="no-href" (click)="navigateBack()">Back</a>
    <form [formGroup]="form" (submit)="login()">
      <input type="text" placeholder="Username" formControlName="username"/>
      <p>Hint: username: atuny0</p>
      <input type="password" placeholder="Password" formControlName="password"/>
      <p>Hint: password: 9uQFF1Lh</p>
      <button type="submit">Login</button>
    </form>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  fb = inject(FormBuilder);
  store = inject(Store);
  location = inject(Location);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  navigateBack() {
    this.location.back();
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    // If the form is valid, the username and password are guaranteed to be a string.
    this.store.dispatch(AppActions.login({ username: this.form.value.username as string, password: this.form.value.password as string }));
  }

}
