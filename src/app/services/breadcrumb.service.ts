import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface Breadcrumb {
  label: string;
  url: string;
}

export type BreadcrumbLabel = string | ((route: ActivatedRouteSnapshot) => string);

interface RouteData {
  breadcrumb?: BreadcrumbLabel;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly router = inject(Router);

  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const crumbs = this.buildBreadcrumbs(root);
        this.breadcrumbs.set(crumbs);
      });
  }

  /**
   * Ручная установка (если нужно переопределить)
   */
  setBreadcrumbs(crumbs: Breadcrumb[]) {
    this.breadcrumbs.set(crumbs);
  }

  /**
   * Основной билдер
   */
  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url = '',
    crumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    if (!route) return crumbs;

    const segment = route.url.map((s) => s.path).join('/');
    const nextUrl = segment ? `${url}/${segment}` : url;

    const data = route.data as RouteData;
    const label = this.resolveLabel(data.breadcrumb, route);

    if (label) {
      crumbs.push({
        label,
        url: nextUrl || '/',
      });
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, crumbs);
    }

    return crumbs;
  }

  /**
   * Поддержка:
   * - string
   * - function(route) => string
   */
  private resolveLabel(
    label: BreadcrumbLabel | undefined,
    route: ActivatedRouteSnapshot,
  ): string | null {
    if (!label) return null;

    if (typeof label === 'function') {
      try {
        return label(route);
      } catch {
        return null;
      }
    }

    return label;
  }
}
