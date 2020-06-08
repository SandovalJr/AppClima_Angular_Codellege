import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiWeatherService {
  private url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=8af63de9e25ee8c3e740ca528fdd2ae6`;

  constructor(private http: HttpClient) {}

  public ObtenerClima(NombreCiudad: string) {
  return  this.http.get(`${this.url}${NombreCiudad}${this.apiKey}`);
  }
}
