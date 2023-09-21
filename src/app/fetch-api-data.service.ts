import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @module AppModule
 * @description This module is used for importing FormsModule.
 */

@NgModule({
  imports: [

    FormsModule,
  ],

})
export class AppModule {}

/**
 * @constant apiUrl
 * @description The base URL for the API.
 */
const apiUrl = 'https://morning-badlands-99587.herokuapp.com/';

/**
 * @class FetchApiDataService
 * @description This service class provides methods to interact with the API to perform CRUD operations.
 */

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {

   /**
   * @constructor
   * @param {HttpClient} http - Injects HttpClient for making HTTP requests.
   */

  constructor(private http: HttpClient) {}

  /**
   * @method POST
   * @description Registers a new user.
   * @param {any} userDetails - The details of the user to be registered.
   * @returns {Observable<any>} The response from the API.
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
/**
   * @method POST
   * @description Allows a user to login.
   * @param {any} userDetails - the users login credentials
   * @returns {Observable<any>} The response from the API.
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

/**
   * @method GET
   * @description Gets a list of all movies that are rendered in the mainview
   * @param this end point has no parameter.
   * @returns {Observable<any>} The response from the API.
   */
  public getMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
   * @method GET
   * @description get a single movie based off of its title
   * @param {any} movieId - The title of the movie
   * @returns {Observable<any>} The response from the API.
   */
  public getMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @method GET
   * @description gets a movie based off the director name
   * @param {any} director - Name of the director
   * @returns {Observable<any>} The response from the API.
   */

  public getDirector(director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/' + director, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
   * @method GET
   * @description gets all the movies for a speciic genre
   * @param {any} genre - the name of the movie genre
   * @returns {Observable<any>} The response from the API.
   */
  public getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
   * @method GET
   * @description Gets information about a specific user based off there userID
   * @param {any} userId - users unique ID attatched to there profile
   * @returns {Observable<any>} The response from the API.
   */
  public getUser(userId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + userId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @method GET
   * @description Returns a list of movie ID's from a users favorite movie array
   * @param {any} userId - The id of the user whos favorite movies are being fetched
   * @returns {Observable<any>} The response from the API.
   */

  public getFavouriteMovie(userId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/favouriteMovies/' + userId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @method POST
   * @description Adds a movie ID to a users favorite movies array
   * @param {any} userId - The ID of the user whos favorite movies array is being populated
   * @returns {Observable<any>} The response from the API.
   */

  public addFavouriteMovie(userId: any, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + 'users' + '/' + userId + '/movies' + '/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

/**
   * @method PUT
   * @description Updates a users information
   * @param {any} username - The username of the person whos info is being updated
   * @returns {Observable<any>} The response from the API.
   */

  public editUser(username: string, updatedUserData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .put(apiUrl + 'users/' + username, updatedUserData, { headers: headers })
      .pipe(catchError(this.handleError));
  }

/**
   * @method DELETE
   * @description Deletes a user from the database
   * @param {any} userId - ID of the user who is being deleted
   * @returns {Observable<any>} The response from the API.
   */

  public deleteUser(userId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + userId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }


  /**
   * @method DELETE
   * @description Deletes a movie id from a users array of favourite movies
   * @param {any} username- the name of the user whos favourite movies area is being altered
   * @param {any} movieId- movieid Of the movie being removed from the users favourites
   * @returns {Observable<any>} The response from the API.
   */

  public removeFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users' + '/' + username + '/movies' + '/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @method GET
   * @description Returns an array containing all the ID of the logged in users favoirte movies
   * @param {any} username - username of the user whos favorite movies are being returned.
   * @returns {Observable<any>} The response from the API.
   */

  public getUserFavorites(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(
      `https://morning-badlands-99587.herokuapp.com/users/${username}/favoritemovies`,
      { headers: headers }
    );
  }

  /**
   * @method GET
   * @description returns a movie object based of its ID
   * @param {any} movieId - ID of movie object that is being retrieved 
   * @returns {Observable<any>} The response from the API.
   */

  public getMovieById(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `https://morning-badlands-99587.herokuapp.com/movies/${movieId}/favoriteMovies`;
    console.log('Fetching movie details from URL:', url); // <-- Log the URL here
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(url, { headers: headers });
  }
  private extractResponseData(res: any): any {
    const body = res;
    return body || '';
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
