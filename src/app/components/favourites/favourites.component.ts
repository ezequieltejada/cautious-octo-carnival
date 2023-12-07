import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <app-navbar></app-navbar>
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
