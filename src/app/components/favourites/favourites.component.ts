import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      favourites works!
    </p>
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
