import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
  template: `
    <app-floating-configurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
            <div class="text-center mb-8">
              <span class="pi pi-user"></span>
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Techradar</div>
              <span class="text-muted-color font-medium">Sign in to continue</span>
            </div>

            <div>
              <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
              <input pInputText id="username" type="text" placeholder="Username" class="w-full md:w-[30rem] mb-8" [(ngModel)]="username" />

              <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
              <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

              <p-button label="Sign In" styleClass="w-full" (onClick)="login()"></p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}

  public login() {
    console.log('Logging in with', this.username);
    const loginData = { username: this.username, password: this.password };
    this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', loginData).subscribe(response => {
      const token = response.access_token;
      // Handle login success
      localStorage.setItem('authToken', token);
      console.log('Login successful');
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error('Login failed', error);
      // Handle login error
      localStorage.removeItem('authToken');
      console.log('Login failed');
      this.router.navigate(['/auth/error']);
    });
  }
}
