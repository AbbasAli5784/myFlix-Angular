import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

/**
 * @component FavouriteMoviesComponent
 * @description Component for viewing user's favourite movies.
 * @selector app-favourite-movies
 */

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.scss'],
})
export class FavouriteMoviesComponent implements OnInit {
  favorites: any[] = [];
  user: any;

 /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API data fetching.
   * @param {Router} router - Service for navigation.
   */

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

 /**
   * @method logout
   * @description Logs out the user and navigates to the home page.
   */

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.user = decodedToken;

      this.fetchApiData.getUserFavorites(this.user.Username).subscribe(
        (movieIds) => {
          movieIds.forEach((id: string) => {
            console.log('Fetching details for movie ID:', id);
            this.fetchApiData.getMovieById(id).subscribe(
              (movie) => {
                console.log('Fetched movie:', movie);
                this.favorites.push(movie);
              },
              (error) => {
                console.error('Error fetching movie:', error);
              }
            );
          });
        },
        (error) => {
          console.error('Error fetching favorite movie IDs:', error);
        }
      );
    }
  }
}
