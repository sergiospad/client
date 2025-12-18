import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {NotificationService} from '../../../service/notification-service';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup;
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenStorageService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm():FormGroup{
    return this.formBuilder.group({
      username:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe({
        next: (data) => this.succeedAuth(data),
        error: (error) => {
          console.log(error);
          this.notificationService.showSnackBar(error.message)
        }
      }
    );
  }

  private succeedAuth(data:any) {
    console.log(data);
    this.tokenService.saveToken(data.token)
    this.tokenService.saveResponse(data);
    this.userService.getCurrentUser()
      .subscribe(user=>this.tokenService.saveUser(user))
    this.notificationService.showSnackBar("Successfully logged in");
    this.router.navigate(['/main']);
    window.location.reload();
  }
}
