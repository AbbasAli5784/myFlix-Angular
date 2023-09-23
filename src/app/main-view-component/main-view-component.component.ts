import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoriteMoviesService } from '../favorite-movies.service';

/**
 * @component MainViewComponent
 * @description Component for the main view of the application.
 * @selector app-main-view-component
 */

@Component({
  selector: 'app-main-view-component',
  templateUrl: './main-view-component.component.html',
  styleUrls: ['./main-view-component.component.scss'],
})
export class MainViewComponent implements OnInit {
  movies: any[] = [];
  user: any;
  favorites: string[] = [];

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API data fetching.
   * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
   * @param {Router} router - Service for navigation.
   */

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private favoriteMoviesService: FavoriteMoviesService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // Fetch all movies
    this.fetchApiData.getMovies().subscribe(
      (data: any) => {
        this.movies = data;
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );

    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.user = decodedToken;
      this.favorites = this.user.FavoriteMovies || [];
      console.log('Initial Favorite Movies:', this.user.FavoriteMovies);
      console.log('Token:', token); // Debugging line
      console.log('Decoded Token:', decodedToken); // Debugging line
      console.log('User:', this.user);
    }

    // Fetch user's favorite movies
    if (this.user && this.user.Username) {
      this.fetchApiData.getUserFavorites(this.user.Username).subscribe(
        (favorites: any[]) => {
          console.log('Raw Favorites Array:', favorites);
          this.favorites = favorites; // Directly assign the array of movie IDs
          console.log('Favorites Array:', this.favorites);

          this.favoriteMoviesService.setFavorites(this.favorites);
        },
        (error: any) => {
          console.error('Error fetching user favorites:', error);
        }
      );
    }
  }

  /**
   * @method logout
   * @description Logs out the user and navigates to the home page.
   */

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  /**
   * @method isFavorite
   * @description Determines if a movie is a favorite.
   * @param {any} movie - The movie to check.
   * @returns {boolean} Whether the movie is a favorite.
   */

  isFavorite(movie: any): boolean {
    return this.favorites.includes(movie._id);
  }
  /**
   * @method toggleFavorite
   * @description Toggles a movie as a favorite.
   * @param {any} movie - The movie to toggle.
   */

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.fetchApiData
        .removeFavouriteMovie(this.user.Username, movie._id)
        .subscribe(
          (response: any) => {
            this.snackBar.open('Removed from favorites!', 'OK', {
              duration: 2000,
            });
            const index = this.favorites.indexOf(movie._id);
            if (index > -1) {
              this.favorites.splice(index, 1);
            }
            this.favoriteMoviesService.setFavorites(this.favorites);
          },
          (error: any) => {
            console.error(error);
            this.snackBar.open('Error removing from favorites', 'OK', {
              duration: 2000,
            });
          }
        );
    } else {
      this.fetchApiData
        .addFavouriteMovie(this.user.Username, movie._id)
        .subscribe(
          (response: any) => {
            this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
            this.favorites.push(movie._id);
            this.favoriteMoviesService.setFavorites(this.favorites);
          },
          (error: any) => {
            console.error(error);
            this.snackBar.open('Error adding to favorites', 'OK', {
              duration: 2000,
            });
          }
        );
    }
  }
}
