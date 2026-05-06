import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AboutPage } from './pages/about-page/about-page';
import { DetailPage } from './pages/detail-page/detail-page';
import { FavoritePage } from './pages/favorite-page/favorite-page';
import { MainLayout } from './components/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        title: 'FC | Home Page',
        component: HomePage,
        data: { breadcrumb: 'Home' },
      },
      {
        path: 'movie/:id',
        title: 'FC | Movie Detail Page',
        component: DetailPage,
        data: {
          breadcrumb: (route: ActivatedRouteSnapshot) => `Movie ${route.params['id']}`,
        },
      },
      {
        path: 'about',
        title: 'FC | About Page',
        component: AboutPage,
        data: { breadcrumb: 'About' },
      },
      {
        path: 'favorite',
        title: 'FC | Favorite Page',
        component: FavoritePage,
        data: { breadcrumb: 'Favorite' },
      },
    ],
  },
];
