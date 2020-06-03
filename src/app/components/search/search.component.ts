import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// necesitamos hacer referencia a http para utilizar los metodos get , post etc
import { HttpClient } from '@angular/common/http';
import { from, fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from 'rxjs/operators';
import {
  Clouds,
  Coord,
  Main,
  clima,
  Sys,
  Weather,
  Wind,
  ClimaFiltrado,
} from './../../interfaces/clima.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad') inputCiudad: ElementRef;
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=8af63de9e25ee8c3e740ca528fdd2ae6`;
  public climaFiltrado: ClimaFiltrado;
  public mostrarTarjeta: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ObtenerClimaActual();
  }
  IrHome() {
    this.router.navigate([""])
  }

  private ObtenerClimaActual() {
    fromEvent(this.inputCiudad.nativeElement, 'keyup')
      .pipe(
        tap(() => (this.mostrarTarjeta = false)),
        debounceTime(1500),
        pluck('target', 'value'),
        switchMap((nombreCiudad) =>
          this.http.get(`${this.url}${nombreCiudad}${this.apiKey}`).pipe(
            map((clima: clima) => {
              return {
                NombreCiudad: clima.name,
                ClimaActual: clima.weather[0].main,
                TemperaturaActual: clima.main.temp,
                TemperaturaMaxima: clima.main.temp_max,
                TemperaturaMinima: clima.main.temp_min,
                Imagen: clima.weather[0].icon,
              };
            })
          )
        )
      )
      .subscribe(
        (objetoFlitrado: ClimaFiltrado) => {
          (this.climaFiltrado = objetoFlitrado), (this.mostrarTarjeta = true);
          // console.log((this.climaFiltrado = objetoFlitrado));
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error',
            text: 'El nombre de la ciudad no existe!',
          });
          this.ObtenerClimaActual();
        }
      );
  }
}
