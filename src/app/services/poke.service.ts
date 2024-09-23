
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(offset = 0, limit = 20): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch Pokémon list', error);
        return of({ results: [] });
      })
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch Pokémon details for ${name}`, error);
        return of(null);
      })
    );
  }

  saveFavorite(pokemon: any): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(pokemon);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
}
    