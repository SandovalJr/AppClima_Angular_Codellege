import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CardsWeatherComponent } from '../components/cards-weather/cards-weather.component';
import { SearchComponent } from '../components/search/search.component';
import { DetallesComponent } from '../components/detalles/detalles.component';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: SearchComponent },
  { path: 'details/:nombreCiudad', component: DetallesComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
export const app_routes = RouterModule.forRoot(rutas);
