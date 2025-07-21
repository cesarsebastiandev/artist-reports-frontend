import { Routes } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'artists',
    pathMatch: 'full',
  },
  {
    path: 'artists',
    component: ArtistComponent,
    title: 'List of Artists'
  },
  {
    path: '**',
    redirectTo: 'artists',
  },
];
