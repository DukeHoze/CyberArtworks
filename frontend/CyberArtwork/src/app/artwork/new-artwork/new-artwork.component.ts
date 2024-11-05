import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-artwork',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-artwork.component.html',
  styleUrl: './new-artwork.component.css'
})
export class NewArtworkComponent {
  @Output() cancelAddArtwork = new EventEmitter<void>()
  entereArtworkdName = signal ("");
  enteredArtworkAuthor = signal ("");
  enteredArtworkCategory = signal ("");
  selectedImage: File | null = null;
  imagePreview: string | null = null;

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

  }

  
}
