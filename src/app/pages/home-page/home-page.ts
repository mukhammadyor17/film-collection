import { Component, inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { FilmCard } from '../../components/film-card/film-card';

@Component({
  selector: 'app-home-page',
  imports: [FilmCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  providers: [FilmService],
})
export class HomePage {
  private readonly filmService = inject(FilmService);

  ngOnInit() {
    this.filmService.getFilms();
  }
}
