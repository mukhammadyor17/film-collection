import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../../types/film.interface';
import { FilmDurationPipe } from '../../pipes/film-duration-pipe';

@Component({
  selector: 'app-film-card',
  imports: [FilmDurationPipe],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
})
export class FilmCard {
  @Input() film!: Film;

  @Output() toggleFavoriteEvent = new EventEmitter<Film>();

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleFavoriteEvent.emit(this.film);
  }
}
