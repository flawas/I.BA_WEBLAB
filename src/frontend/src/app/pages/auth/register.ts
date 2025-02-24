import {FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Router, RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {Component} from '@angular/core';
import {RippleModule} from 'primeng/ripple';
import {AppFloatingConfigurator} from '../../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ReactiveFormsModule],
  template: `
    <app-floating-configurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
            <div class="text-center mb-8">
              <span class="pi pi-user"></span>
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Techradar</div>
              <span class="text-muted-color font-medium">Register to continue</span>
            </div>

            <div>
              <form [formGroup]="registerForm">
                <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                <input pInputText id="username" type="text" placeholder="Username" class="w-full md:w-[30rem] mb-8" formControlName="username" />

                <label for="password1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Password</label>
                <input pInputText type="password" id="password1" placeholder="Password" class="w-full md:w-[30rem] mb-8" formControlName="password1"/>

                <label for="password2" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Password (repeat)</label>
                <input pInputText type="password"  id="password2" placeholder="Password" class="w-full md:w-[30rem] mb-8" formControlName="password2"/>

                <label for="mail" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Mail</label>
                <input pInputText id="mail" type="text" placeholder="Mail" class="w-full md:w-[30rem] mb-8" formControlName="mail"/>

                <label for="register" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"></label>
                <p-button id="register" label="Register" styleClass="w-full md:w-[30rem] mb-8" (onClick)="register()"></p-button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Register {
  registerForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password1 = form.get('password1')?.value;
    const password2 = form.get('password2')?.value;
    if (password1 !== password2) {
      form.get('password2')?.setErrors({ mismatch: true });
    } else {
      form.get('password2')?.setErrors(null);
    }
  }

  async register() {
    if (this.registerForm.valid) {
      console.log('Registering with', this.registerForm.value.username!);
      try {
        const user = {
          username: this.registerForm.value.username!,
          password: this.registerForm.value.password1!,
          mail: this.registerForm.value.mail!,
          roles: ["user"]
        };
        const response: any = await this.userService.createUser(user);
        console.log('Register response:', response);

        if (response && response.username) {
          console.log('Register successful');
          this.router.navigate(['/auth/login']);
          return 'success';
        } else {
          console.error('Register failed with response code', response.status);
          return 'error';
        }
      } catch (error: any) {
        console.error('Register failed', error);
        this.router.navigate(['/auth/error']);
        return 'error';
      }
    } else {
      console.log('Form is invalid');
      return 'invalid';
    }
  }
}
