import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {}
