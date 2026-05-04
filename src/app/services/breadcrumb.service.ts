import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

type Breadcrumb = { label: string; url: string };

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs.set(this.buildBreadcrumbs(this.activatedRoute.root));
      }
    });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    crumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    for (const child of route.children) {
      if (!child.snapshot) continue;
      const segment = child.snapshot.url.map((s) => s.path).join('/');
      if (segment) url += `/${segment}`;
      const label = child.snapshot.data['breadcrumb'];
      if (label) crumbs.push({ label, url });
      return this.buildBreadcrumbs(child, url, crumbs);
    }
    return crumbs;
  }
}
