import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, DestroyRef, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewUserComponent } from "../new-user/new-user.component";
import { AuthService } from '../auth.service';
import { BackendResponse, UserData } from '../user.model';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, NewUserComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  @Output() cancelLogin = new EventEmitter<void>()
  @Output() successfulLogin = new EventEmitter<void>()
  private apiUrl = 'http://localhost:8080/user/login';
  enteredEmail= signal ("");
  enteredPassword= signal ("");
  isAddingUser = false;
  
  constructor(private authService: AuthService, private http: HttpClient) {}
  
  onAddUser(){
    this.isAddingUser = true;
  }

  onCancelAddingUser(){
    this.isAddingUser = false;
  }

  onCancel(){
    this.cancelLogin.emit();
  }

  loginUser(data: { email: string, password: string }) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  let params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    // Hacemos la solicitud GET con parámetros en la URL
    console.log(data.email+ "asdawsads");
    this.http.post<BackendResponse>(this.apiUrl, data, { headers })
    .subscribe({
      next: (response) => {
        // Transform backend response to match UserData
        const userData: UserData = {
          id: response.userId.toString(),
          email: response.email,
          is_admin: response.isAdmin,
          name: response.name,
          surname: response.surname,
          password: '', // optional or placeholder
        };

        // Store the transformed user data
        this.authService.setUserData(userData);
        console.log('Usuario logeado con éxito:', this.authService.getUserData());
        this.successfulLogin.emit();
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    });
  }
}