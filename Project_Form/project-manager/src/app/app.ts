import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportsModule } from './imports';
import { InputTextModule } from 'primeng/inputtext'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportsModule, InputTextModule, FormsModule, Checkbox, ButtonModule, ReactiveFormsModule, CheckboxModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MessageService]
})
export class App implements OnInit {
 messageService = inject(MessageService);

  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  ngOnInit(): void {
    
  }

  onLogin() {
    if (this.username === 'admin' && this.password === '12345' && this.rememberMe) {
      this.messageService.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Welcome admin!',
        life: 3000
      });
      // Reset form
      this.username = '';
      this.password = '';
      this.rememberMe = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid credentials or Remember me not checked',
        life: 3000
      });
    }
  }
}