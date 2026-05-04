import { Component, inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { FilmCard } from '../../components/film-card/film-card';
import { NoResult } from '../../components/no-result/no-result';
import { Film } from '../../types/film.interface';

@Component({
  selector: 'app-favorite-page',
  imports: [FilmCard, NoResult],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.css',
})
export class FavoritePage {
  readonly filmService = inject(FilmService);

  toggleFavorite(film: Film) {
    this.filmService.toggleFavorite(film.id);
  }
}
