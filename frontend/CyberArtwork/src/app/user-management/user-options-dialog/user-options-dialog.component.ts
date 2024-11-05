import { Component, EventEmitter, Output } from '@angular/core';
import { NewUserComponent } from "../new-user/new-user.component";
import { UserLoginComponent } from "../user-login/user-login.component";

@Component({
  selector: 'app-user-options-dialog',
  standalone: true,
  imports: [NewUserComponent, UserLoginComponent],
  templateUrl: './user-options-dialog.component.html',
  styleUrl: './user-options-dialog.component.css'
})
export class UserOptionsDialogComponent {
  @Output() cancelUserOptions = new EventEmitter<void>()
  isAddingUser = false;
  isLogingUser = false;
  
  onUserLogin(){
    this.isLogingUser=true;
  }

  onAddUser(){
    this.isAddingUser = true;
  }
 
  onCancelUserManagement(){
    this.isAddingUser = false;
    this.isLogingUser = false;
  }

  onCancel(){
    this.cancelUserOptions.emit();
  }
}
