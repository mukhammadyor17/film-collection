import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Film } from '../../types/film.interface';
import { FilmDurationPipe } from '../../pipes/film-duration-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-card',
  imports: [FilmDurationPipe],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
})
export class FilmCard {
  readonly router = inject(Router);

  @Input() film!: Film;

  @Output() toggleFavoriteEvent = new EventEmitter<Film>();

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleFavoriteEvent.emit(this.film);
  }

  goDetailPage() {
    this.router.navigate(['/movie', this.film.id]);
  }
}
