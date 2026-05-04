import { Component, inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { FilmCard } from '../../components/film-card/film-card';
import { Film } from '../../types/film.interface';
import { NoResult } from '../../components/no-result/no-result';

@Component({
  selector: 'app-home-page',
  imports: [FilmCard, NoResult],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  readonly filmService = inject(FilmService);

  ngOnInit() {
    this.filmService.loadFilms();
  }

  onSearch(event: Event) {
    this.filmService.searchQuery.set((event.target as HTMLInputElement).value);
  }

  toggleFavorite(film: Film) {
    this.filmService.toggleFavorite(film.id);
  }
}
