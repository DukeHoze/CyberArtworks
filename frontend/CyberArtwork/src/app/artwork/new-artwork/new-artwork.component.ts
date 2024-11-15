import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../user-management/auth.service';
import { ArtworksService } from '../artworks.service';

@Component({
  selector: 'app-new-artwork',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-artwork.component.html',
  styleUrl: './new-artwork.component.css'
})
export class NewArtworkComponent {
  @Output() cancelAddArtwork = new EventEmitter<void>()
  enteredArtworkTitle = signal ("");
  enteredArtworkAuthor = signal ("");
  enteredArtworkDescription = signal ("");
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(private artworksService: ArtworksService, private authService: AuthService) {}
  
  onCancel(){
    this.cancelAddArtwork.emit();
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      this.imagePreview = URL.createObjectURL(file); // Create a preview URL for the image
    }
  }

  onSubmit(){
    if (!this.selectedImage) {
      alert('Please select an image file.');
      return;
    }

    // Get the current user data from AuthService
    const user = this.authService.getUserData();
    if (!user ) {
      alert('User is not logged in.');
      return;
    }


    const title = this.enteredArtworkTitle();
    const author = this.enteredArtworkAuthor();
    const description = this.enteredArtworkDescription();
    const userId =Number (user.id); // Replace with the actual user ID (dynamic value)

    console.log(title);
    
    console.log(author);
    
    console.log(description);
    
    console.log(userId);

    this.artworksService
      .uploadImage(this.selectedImage, title, description, author, userId)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log('Image uploaded successfully:', JSON.stringify(response));
          alert('Artwork uploaded successfully: ' + JSON.stringify(response));
          this.onCancel(); // Reset the form after successful upload
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        },
      });
  }
}