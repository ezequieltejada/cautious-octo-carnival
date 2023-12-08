import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Store } from '@ngrx/store';
import { ProductListComponent } from '../product-list/product-list.component';
import { FavouritesListComponent } from '../favourites-list/favourites-list.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [NavbarComponent, FavouritesListComponent],
  template: `
    <app-navbar></app-navbar>
    <app-favourites-list></app-favourites-list>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesComponent {
  store = inject(Store);
}
