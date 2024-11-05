import { Component, input, output } from '@angular/core';
import { Artwork } from '../artwork.model';

@Component({
  selector: 'app-artworks',
  standalone: true,
  imports: [],
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.css'
})
export class ArtworksComponent {
  artworks = input.required<Artwork[]>();
  selectArtwork = output<Artwork>();

  onSelectPlace(artwork: Artwork) {
    this.selectArtwork.emit(artwork);
  }
}
