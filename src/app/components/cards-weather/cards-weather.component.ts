import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from './../../interfaces/clima.interface';
@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css'],
})
export class CardsWeatherComponent implements OnInit {
  @Input() climaFiltradoRecibido: ClimaFiltrado;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.climaFiltradoRecibido);

  }
}
