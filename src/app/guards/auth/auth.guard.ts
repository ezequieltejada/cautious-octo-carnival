import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/app/app.selectors';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(Store).select(selectUser);
  const router = inject(Router);
  return user.pipe(
    map((user) => {
      if (!user) {
        return router.createUrlTree(['/login']);
      }
      return true;
    })
  );
};
