import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, DestroyRef, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewUserComponent } from "../new-user/new-user.component";

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, NewUserComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  @Output() cancelLogin = new EventEmitter<void>()
  private apiUrl = 'http://localhost:8080/user/login';
  enteredEmail= signal ("");
  enteredPassword= signal ("");
  isAddingUser = false;
  constructor(private http: HttpClient) {}
  
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
    this.http.post(this.apiUrl, data, { headers })

      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          console.log('Usuario creado con éxito:', response);
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
        }
      });
  }
}