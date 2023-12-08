import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from './state/app/app.selectors';
import { map, pairwise } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription$: any;
  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription$ = this.store.select(selectUser).pipe(
      pairwise(),
      map(([previousUser, currentUser]) => {
        if (!previousUser && currentUser) {
          this.router.navigateByUrl('/');
        }
        if (previousUser && !currentUser) {
          this.router.navigateByUrl('/login');
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
