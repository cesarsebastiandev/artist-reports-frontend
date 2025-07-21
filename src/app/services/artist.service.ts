import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  private URLBASE: string = environment.APIURL;

  getAllArtists() {
    return this.http.get(this.URLBASE + '/artists');
  }

  downloadReport() {
    return this.http.get(this.URLBASE + `/artists/pdf`, {
      responseType: 'blob',
    });
  }
}
