import { Component, input } from '@angular/core';

@Component({
  selector: 'app-artwork-container',
  standalone: true,
  imports: [],
  templateUrl: './artwork-container.component.html',
  styleUrl: './artwork-container.component.css'
})
export class ArtworkContainerComponent {
  title = input.required<string>();
}
