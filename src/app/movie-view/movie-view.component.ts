import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * @component MovieViewComponent
 * @description Component for viewing a single movie.
 * @selector app-movie-view
 */

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit {
  /**
   * @property movie
   * @description Object to hold the movie data.
   */

  movie: any;

  /**
   * @constructor
   * @param {ActivatedRoute} route - Service to access route parameters.
   * @param {Router} router - Service for navigation.
   * @param {FetchApiDataService} fetchApiData - Service for API data fetching.
   */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('movieId'); // Fetch the movie ID from the route
    this.fetchApiData.getMovie(movieId).subscribe((data) => {
      this.movie = data;
    });
  }

  /**
   * @method handleBackClick
   * @description Navigates back to the movies list.
   */

  handleBackClick(): void {
    this.router.navigate(['/movies']);
  }
}
