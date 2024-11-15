import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ArtworksComponent } from "../artworks/artworks.component";
import { ArtworkContainerComponent } from "../artwork-container/artwork-container.component";
import { Artwork } from '../artwork.model';
import { HttpClient } from '@angular/common/http';
import { ArtworksService } from '../artworks.service';
import { AuthService } from '../../user-management/auth.service';

@Component({
  selector: 'app-available-artwork',
  standalone: true,
  imports: [ArtworksComponent, ArtworkContainerComponent],
  templateUrl: './available-artwork.component.html',
  styleUrl: './available-artwork.component.css'
})
export class AvailableArtworkComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private apiUrl = 'http://localhost:8080/usuario/sax';
  isFetching = signal(false);
  artworks = signal<Artwork[] | undefined>([
    {
      id: "1",
      title: "Sunset Harmony",
      author: "Ana García",
      description: "Paisaje",
      image: {
        src: "/assets/amazon-river.jpg",
        alt: "Un hermoso atardecer sobre el mar"
      }
    },
    {
      id: "2",
      title: "Abstract Reflections",
      author: "Luis Rodríguez",
      description: "Abstracto",
      image: {
        src: "/assets/amazon-river.jpg",
        alt: "Una pintura abstracta llena de colores vibrantesSELVA"
      }
    },
    {
      id: "3",
      title: "City Lights",
      author: "Carmen Santos",
      description: "Urbano",
      image: {
        src: "/assets/ruins.jpg",
        alt: "Vista nocturna de una ciudad iluminada"
      }
    },
    {
      id: "4",
      title: "Nature's Whisper",
      author: "José Martínez",
      description: "Naturaleza",
      image: {
        src: "/assets/rainforest.jpg",
        alt: "Una escena tranquila en un bosque"
      }
    }
  ]);

  constructor(private artworksService: ArtworksService, private authService: AuthService) {}

  ngOnInit(){
    this.loadArtworks();
    /* this.isFetching.set(true);
    const subscribtion = this.httpClient.get<{artworks: Artwork[]}>(this.apiUrl).subscribe({
      next: (restposeData) => {
        console.log(restposeData.artworks);
        this.artworks.set(restposeData.artworks)
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });
    this.destroyRef.onDestroy(() =>{
      subscribtion.unsubscribe();
    }); */
  }

  loadArtworks(): void {
    this.artworksService.getAllArtworks().subscribe({
      next: (data) => {
        this.artworks.set(data); // Update the signal with the fetched artworks
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        //this.errorMessage = 'There was an error loading the artworks: ' + error.message;
      }
    }); 
  }

  onSelectArtwork (selectArtwork: Artwork) {
    
  }
}
