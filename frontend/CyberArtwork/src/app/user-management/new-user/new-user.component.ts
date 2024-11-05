import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  @Output() cancelAddUser = new EventEmitter<void>()
  private httpClient = inject(HttpClient);
  enteredName=signal ("");
  enteredSurname= signal ("");
  enteredEmail= signal ("");
  enteredPassword= signal ("");
   // URL del endpoint local
   private apiUrl = 'http://localhost:8080/user/registro';
  constructor(private http: HttpClient) {}
  

  onCancel(){
    this.cancelAddUser.emit();
  }

   // Método para agregar un usuario mediante POST
   addUser(data: { name: string, surname: string, email: string, password: string}) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
      const payload = {
    name: this.enteredName,
    surname: this.enteredSurname,
    email: this.enteredEmail,
    password: this.enteredPassword
  };
    console.log(data+ "asdawsads");
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

