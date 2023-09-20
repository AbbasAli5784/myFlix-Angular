import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit {
  movie: any;

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
  handleBackClick(): void {
    this.router.navigate(['/movies']);
  }
}
