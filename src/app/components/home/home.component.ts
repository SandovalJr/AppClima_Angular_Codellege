import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { clima, ClimaFiltrado } from './../../interfaces/clima.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=8af63de9e25ee8c3e740ca528fdd2ae6`;
  public ArrayClimaFiltrado: Array<ClimaFiltrado> = [];
  public loading: boolean = true;

  constructor(private router: Router, private http: HttpClient) {
    this.getLocalStorage();
  }

  ngOnInit(): void {}

  IrAgregar() {
    this.router.navigate(['/add']);
  }

  getLocalStorage() {
    const climas = JSON.parse(localStorage.getItem('Climas'));
    if (climas !== null) {
      this.getWeather(climas);
    }
  }

  getWeather(climas: Array<string>) {
    console.log(climas);

    from(climas)
      .pipe(
        /*****
        ConcatMap
        ******/
        concatMap((nombreClima) =>
          this.http.get(`${this.url}${nombreClima}${this.apiKey}`).pipe(
            /******MAP****/

            map((Clima: clima) => {
              const climaFiltrado: ClimaFiltrado = {
                NombreCiudad: Clima.name,
                ClimaActual: Clima.weather[0].main,
                TemperaturaActual: Clima.main.temp,
                TemperaturaMaxima: Clima.main.temp_max,
                TemperaturaMinima: Clima.main.temp_min,
                Imagen: Clima.weather[0].icon,
              };
              return climaFiltrado;
            })
            /********MAP FIN*******/
          )
        )
        /***********ConCat Map***************/
      )
      .subscribe((climaFiltrado: ClimaFiltrado) => {
        this.ArrayClimaFiltrado.push(climaFiltrado);
        if (this.ArrayClimaFiltrado.length == climas.length) {
          this.loading = false;
        }
        console.log(this.ArrayClimaFiltrado);
      });
  }
}
