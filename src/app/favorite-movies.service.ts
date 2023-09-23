import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMoviesService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  setFavorites(favorites: string[]) {
    this.favoritesSubject.next(favorites);
  }

  addFavorite(movieId: string) {
    const currentFavorites = this.favoritesSubject.getValue();
    if (!currentFavorites.includes(movieId)) {
      this.favoritesSubject.next([...currentFavorites, movieId]);
    }
  }

  removeFavorite(movieId: string) {
    const currentFavorites = this.favoritesSubject.getValue();
    this.favoritesSubject.next(currentFavorites.filter((id) => id !== movieId));
  }

  isFavorite(movieId: string): boolean {
    return this.favoritesSubject.getValue().includes(movieId);
  }
}
