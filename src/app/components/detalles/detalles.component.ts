import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, concatMap, switchMap, map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Clouds,
  Coord,
  Main,
  clima,
  Sys,
  Weather,
  Wind,
  ClimaFiltrado,
  clima2,
} from './../../interfaces/clima.interface';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=8af63de9e25ee8c3e740ca528fdd2ae6`;
  public weatherDetail;
  public climaFiltrado: ClimaFiltrado;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    // nos permite tomar un parametro de la URL
    const ciudad = this.activatedRoute.snapshot.paramMap.get('nombreCiudad');
    //this.weatherDetail = this.http.get(`${this.url}${ciudad}${this.apiKey}`);
    console.log(`${this.url}${ciudad}${this.apiKey}`);

    this.weatherDetail = this.http
      .get(`${this.url}${ciudad}${this.apiKey}`)
      .pipe(
        map((clima: clima2) => {
          return {
            NombreCiudad: clima.name,
            ClimaActual: clima.weather[0].main,
            TemperaturaActual: Math.floor(clima.main.temp - 273.15),
            TemperaturaMaxima: Math.floor(clima.main.temp_max - 273.15),
            TemperaturaMinima: Math.floor(clima.main.temp_min - 273.15),
            Imagen: clima.weather[0].icon,
            Humedad: clima.main.humidity,
            Wind: clima.wind.speed,
          };
        })
      )
      .subscribe((valor: ClimaFiltrado) => {
        console.log(valor);
        this.climaFiltrado = valor;
      });
  }

  ngOnInit(): void {}

  // public getCiudad(ciudad: string): Observable<any> {
  //   console.log(ciudad);
  // }
}

/*****
from: es el que se encarga de crear un observable a travez de un conjunto
de datos o una matris (va separando cada uno de los datos)
Emite un valor , por cada valor que existe en el array.

of: convirte cualquier tipo de dato

ConcatMap: Se suscribe a un 2 observable cuando el 1 observable emite un valor,
cada valor espera de que cada uno se complete antes de iniciar con el siguiente

pluck: Obtener el valor de una propiedad.


******/
