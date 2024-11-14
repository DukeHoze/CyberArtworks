import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AvailableArtworkComponent } from "./artwork/available-artwork/available-artwork.component";
import { ScrollToTopComponent } from "./scroll-to-top/scroll-to-top.component";
import { FavoriteArtworksComponent } from "./artwork/favorite-artworks/favorite-artworks.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AvailableArtworkComponent, ScrollToTopComponent, FavoriteArtworksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CyberArtwork';
}
