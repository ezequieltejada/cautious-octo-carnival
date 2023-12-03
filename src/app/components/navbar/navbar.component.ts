import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAppState, selectUser } from '../../state/app/app.selectors';
import { AppActions } from '../../state/app/app.actions';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <div>
        <ul>
          <li><a [routerLink]="['/']" routerLinkActive="router-link-active" >Home</a></li>
          <li><a [routerLink]="['/favourites']" routerLinkActive="router-link-active" >Favourites</a></li>
        </ul>
      </div>
      <div>
        <ul>
          @if (user$ | async) {
            <li><a class="no-href" (click)="logout()" >Logout</a></li>
          } @else {
            <li><a [routerLink]="['/login']" routerLinkActive="router-link-active" >Login</a></li>
          }
        </ul>
      </div>
    </nav>
  `,
  styles: `
    :host {
      display: block;

      & nav {
        display: flex;
        justify-content: space-between;

        & ul {
          list-style: none;
          padding: 0;
          display: flex;
          gap: 10px;
          
          & li {
            display: inline-block;

            
          }
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  user$: any;
  constructor(private store: Store) { }

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.store.dispatch(AppActions.logout())
  }
}
