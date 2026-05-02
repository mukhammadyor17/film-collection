import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AboutPage } from './pages/about-page/about-page';
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
      },
      {
        path: 'about',
        title: 'FC | About Page',
        component: AboutPage,
      },
      {
        path: 'favorite',
        title: 'FC | Favorite Page',
        component: FavoritePage,
      },
    ],
  },
];
