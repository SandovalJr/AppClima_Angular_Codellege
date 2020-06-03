import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { app_routes } from './pipes/app.routes';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { CardsWeatherComponent } from './components/cards-weather/cards-weather.component';
import { HttpClientModule } from '@angular/common/http';
import { KelvinCelsiusPipe } from './pipes/kelvin-celsius.pipe';
import { CambiarImagenClimaDirective } from './directives/cambiar-imagen-clima.directive';
import { ConstruirUrlImagenPipe } from './pipes/construir-url-imagen.pipe';
import { HomeComponent } from './components/home/home.component';

// sweet alert
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import * as Swal from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardsWeatherComponent,
    KelvinCelsiusPipe,
    CambiarImagenClimaDirective,
    ConstruirUrlImagenPipe,
    HomeComponent,
  ],
  imports: [BrowserModule, HttpClientModule, app_routes],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
