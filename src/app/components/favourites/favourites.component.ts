import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
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
}
