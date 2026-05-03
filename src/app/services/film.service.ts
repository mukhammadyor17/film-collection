import { inject, Injectable } from '@angular/core';
import { Film } from '../types/film.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  films: Film[] = [];
  favorites: Film[] = [];

  private readonly http = inject(HttpClient);

  getFilms() {
    this.http.get<Film[]>('/film.json').subscribe((value) => {
      this.films = value;
    });
  }
}
