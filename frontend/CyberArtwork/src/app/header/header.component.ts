import { Component } from '@angular/core';
import { NewUserComponent } from "../user-management/new-user/new-user.component";
import { NewArtworkComponent } from "../artwork/new-artwork/new-artwork.component";
import { UserOptionsDialogComponent } from "../user-management/user-options-dialog/user-options-dialog.component";
import { UserLoginComponent } from "../user-management/user-login/user-login.component";
import { AuthService } from '../user-management/auth.service';
import { UserData } from '../user-management/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NewUserComponent, NewArtworkComponent, UserOptionsDialogComponent, UserLoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Fix typo: styleUrls instead of styleUrl
})
export class HeaderComponent {
  user: UserData | null = null; // Adjust type if needed
  isLoginUser = false;
  isAddingArtwork = false;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUserData(); // Initialize user here
  }

  onAddUser() {
    this.isLoginUser = true;
  }

  onAddArtwork() {
    this.isAddingArtwork = true;
  }

  onLogged() {
    this.user = this.authService.getUserData() || this.user; // Refresh user data
  
    // Log the user object as a JSON string to display its full structure
    console.log("Bazinga", JSON.stringify(this.user, null, 2) + this.user?.email);
  }

  onLogout() {
    this.authService.deleteUserData();  // Call the deleteUserData method to clear user data
    this.user = this.authService.getUserData();  // Get updated user data (which should be null now)
    console.log("dumb", JSON.stringify(this.user, null, 2) + (this.user?.email || 'No email'));
}

  onCancelAdding() {
    this.isLoginUser = false;
    this.isAddingArtwork = false;
  }
}
