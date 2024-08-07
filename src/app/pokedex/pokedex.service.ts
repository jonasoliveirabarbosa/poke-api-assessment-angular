import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../pokemon-details/pokemon.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PokedexService {
  constructor(private http: HttpClient) {}
  getPokemonList(offset: number): Observable<PokemonDetails[]> {
    return this.http.get<PokemonDetails[]>(`${environment.apiUrl}/pokedex/`, {
      params: {
        offset,
      },
    });
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(
      `${environment.apiUrl}/pokedex/${name}`
    );
  }
}
