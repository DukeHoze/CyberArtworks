import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artwork } from './artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {
  private apiUrl = 'http://localhost:8080/api/images'; // Adjust as needed

  constructor(private http: HttpClient) {}

    uploadImage(
    file: File,
    title: string,
    author: string,
    description: string,
    userId: number
  ): 
  Observable<any> {
    const formData = new FormData();
   // formData.append('file', file);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('userId', userId.toString());
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    });
  }

  // Method to get all artworks
  getAllArtworks(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.apiUrl);
  }
}