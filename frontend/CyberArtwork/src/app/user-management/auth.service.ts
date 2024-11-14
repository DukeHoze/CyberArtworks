import { Injectable, signal } from '@angular/core';
import { UserData } from './user.model';

@Injectable({
    providedIn: 'root'
  })

  
  export class AuthService {
    // Initialize userData as a signal that holds an optional UserData type
    userData = signal<UserData | null>(null);
  
    // Method to set user data from backend response
    setUserData(data: UserData) {
      this.userData.set(data);  // Use set() to update the signal’s value
    }
  
    // Method to retrieve the current user data
    getUserData() {
      return this.userData(); // Signals are called as functions to retrieve their current value
    }
  
    // Method to check if the user is logged in
    isLoggedIn() {
      return this.userData() !== null;  // Signals are called as functions to access their current value
    }

    deleteUserData() {
        this.userData.set(null);  // Reset the signal’s value to null
      }
  }