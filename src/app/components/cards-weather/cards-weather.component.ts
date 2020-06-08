import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from './../../interfaces/clima.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css'],
})
export class CardsWeatherComponent implements OnInit {
  @Input() climaFiltradoRecibido: ClimaFiltrado;
  @Input() MostrarBoton: boolean = false;

  constructor(private router: Router) {
    console.log(this.MostrarBoton);
  }

  ngOnInit(): void {
    // console.log(this.climaFiltradoRecibido);
  }

  AgregarCiudad() {
    const ArrayWeather = this.GetLocalStorage();
    if (this.ChecarNoRepetidos(ArrayWeather) == 0) {
      ArrayWeather.push(this.climaFiltradoRecibido.NombreCiudad);
      localStorage.setItem('Climas', JSON.stringify(ArrayWeather));
      // this.MostrarBoton == true;
    }
  }

  private ChecarNoRepetidos(ArrayWeather: Array<string>): number {
    const ciudades: Array<any> = ArrayWeather.filter(
      (clima) => clima == this.climaFiltradoRecibido.NombreCiudad
    );
    return ciudades.length;
  }

  public GetLocalStorage() {
    const ArrayWeather = JSON.parse(localStorage.getItem('Climas'));
    if (ArrayWeather == null) {
      return [];
    } else {
      return ArrayWeather;
    }
  }

  public irDetalles(nombreCiudad: string) {
    // console.log(nombreCiudad);

    if (!this.MostrarBoton) {
      this.router.navigate(['details', nombreCiudad]);
    }
  }
}
