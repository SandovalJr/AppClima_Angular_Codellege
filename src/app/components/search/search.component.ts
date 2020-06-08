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
import { ApiWeatherService } from 'src/app/services/api-weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('inputCiudad') inputCiudad: ElementRef;

  public climaFiltrado: ClimaFiltrado;
  public mostrarTarjeta: boolean = false;
  // AWServise es un services
  constructor( private router: Router, private AWServisce:ApiWeatherService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ObtenerClimaActual();
  }

  // metodo para ir a home
  IrHome() {
    this.router.navigate([""])
  }

  private ObtenerClimaActual() {
    fromEvent(this.inputCiudad.nativeElement, 'keyup')
      .pipe(
        tap(() => (this.mostrarTarjeta = false)),
        debounceTime(1500),
        pluck('target', 'value'),
        switchMap((nombreCiudad:string) =>
          this.AWServisce.ObtenerClima(nombreCiudad).pipe(
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
