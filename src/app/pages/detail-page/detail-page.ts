import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { FilmDurationPipe } from '../../pipes/film-duration-pipe';

@Component({
  selector: 'app-detail-page',
  imports: [FilmDurationPipe],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.css',
})
export class DetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly filmService = inject(FilmService);
  private readonly breadcrumbService = inject(BreadcrumbService);

  readonly film = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.filmService.getFilmById(id);
  });

  constructor() {
    effect(() => {
      const film = this.film();
      if (film) {
        this.breadcrumbService.setBreadcrumbs([
          { label: 'Home', url: '/' },
          { label: film.title, url: `/movie/${film.id}` },
        ]);
      }
    });
  }

  ngOnInit(): void {
    this.filmService.loadFilms();
  }

  goBack(): void {
    this.location.back();
  }
}
