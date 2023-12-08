import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'favourites/:userId', component: FavouritesComponent, canActivate: [authGuard] },
    { path: '**', pathMatch: 'full', redirectTo: '' },
];
