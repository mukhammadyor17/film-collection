import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../types/film.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private readonly http = inject(HttpClient);

  private readonly _films = signal<Film[]>([]);
  private readonly _loaded = signal(false);
  readonly searchQuery = signal('');

  readonly films = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this._films();
    return this._films().filter((film) => film.title.toLowerCase().includes(query));
  });

  readonly favoriteFilms = computed(() => {
    return this._films().filter((film) => film.isFavorite);
  });

  toggleFavorite(id: number): void {
    this._films.update((films) =>
      films.map((film) => {
        return film.id === id ? { ...film, isFavorite: !film.isFavorite } : film;
      }),
    );
  }

  getFilmById(id: number): Film | undefined {
    return this._films().find((f) => f.id === id);
  }

  loadFilms(): void {
    if (this._loaded()) return;
    this.http.get<Film[]>('/film.json').subscribe((films) => {
      this._films.set(films);
      this._loaded.set(true);
    });
  }
}
