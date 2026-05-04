import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeader } from '../page-header/page-header';
import { PageFooter } from '../page-footer/page-footer';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, PageHeader, PageFooter],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
