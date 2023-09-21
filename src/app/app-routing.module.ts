import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MainViewComponent } from './main-view-component/main-view-component.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { FavouriteMoviesComponent } from './favourite-movies/favourite-movies.component';

/**
 * @description Defines the routes of the application.
 */
const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'login', component: UserLoginFormComponent },
  { path: 'movies', component: MainViewComponent },
  { path: 'movies/:movieId', component: MovieViewComponent },
  { path: 'profile', component: ProfileViewComponent },
  {path: 'favorites', component: FavouriteMoviesComponent},
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
/**
 * @module AppRoutingModule
 * @description A module that uses the RouterModule to expose application routes.
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
