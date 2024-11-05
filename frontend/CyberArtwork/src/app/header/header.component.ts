import { Component } from '@angular/core';
import { NewUserComponent } from "../user-management/new-user/new-user.component";
import { NewArtworkComponent } from "../artwork/new-artwork/new-artwork.component";
import { UserOptionsDialogComponent } from "../user-management/user-options-dialog/user-options-dialog.component";
import { UserLoginComponent } from "../user-management/user-login/user-login.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NewUserComponent, NewArtworkComponent, UserOptionsDialogComponent, UserLoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoginUser = false;
  isAddingArtwork= false;
  
  onAddUser(){
    this.isLoginUser = true;
  }
  onAddArtwork(){
    this.isAddingArtwork  = true;
  }
  onCancelAdding(){
    this.isLoginUser = false;
    this.isAddingArtwork = false;
  }
}
