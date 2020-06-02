import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { CardsWeatherComponent } from './components/cards-weather/cards-weather.component';
import { HttpClientModule } from '@angular/common/http';
import { KelvinCelsiusPipe } from './pipes/kelvin-celsius.pipe';
import { CambiarImagenClimaDirective } from './directives/cambiar-imagen-clima.directive';
import { ConstruirUrlImagenPipe } from './pipes/construir-url-imagen.pipe';
@NgModule({
  declarations: [AppComponent, SearchComponent, CardsWeatherComponent, KelvinCelsiusPipe, CambiarImagenClimaDirective, ConstruirUrlImagenPipe],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
