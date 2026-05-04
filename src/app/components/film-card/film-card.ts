import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../../types/film.interface';

@Component({
  selector: 'app-film-card',
  imports: [],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
})
export class FilmCard {
  @Input() film!: Film;

  @Output() toggleFavoriteEvent = new EventEmitter<Film>();

  formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleFavoriteEvent.emit(this.film);
  }
}
