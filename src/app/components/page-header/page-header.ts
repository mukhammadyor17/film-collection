import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  readonly filmService = inject(FilmService);

  count = 5;
}
