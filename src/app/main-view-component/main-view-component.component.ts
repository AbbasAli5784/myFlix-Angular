import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
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
    }

    // Fetch user's favorite movies
    if (this.user && this.user.Username) {
      this.fetchApiData.getUserFavorites(this.user.Username).subscribe(
        (favorites: any[]) => {
          this.favorites = favorites.map((movie) => movie._id);
          console.log('Favorites Array:', this.favorites);
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
    const isFav = this.favorites.includes(movie._id);
    console.log(`Is movie ${movie._id} a favorite?`, isFav); // Add this line
    return isFav;
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
            this.snackBar.open('Added to favorites!', 'OK', {
              duration: 2000,
            });
            this.favorites.push(movie._id);
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
