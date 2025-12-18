import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {NotificationService} from '../../../service/notification-service';
import {Router, RouterLink} from '@angular/router';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],

      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    })
  }

  register(): void {
    this.authService.register({
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,

      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe({
        next: (data) => {
          console.log(data);

          this.router.navigate(['/']).then(r =>
            this.notificationService.showSnackBar("Successfully registered"));
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          this.notificationService.showSnackBar(error.message)
        }
      }
    );
  }
}
