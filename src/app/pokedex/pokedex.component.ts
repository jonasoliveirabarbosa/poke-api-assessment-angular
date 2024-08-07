import { Component, OnInit } from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import { PokedexService } from './pokedex.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonDetails } from '../pokemon-details/pokemon.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PokemonDetailsComponent,
    MatToolbarModule,
    MatList,
    MatListItem,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInputModule,
    MatCard,
    MatCardContent,
    MatDivider,
    MatButtonModule,
    MatCardTitle,
    MatCardHeader,
    CommonModule,
    MatCardActions,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
})
export class PokedexComponent implements OnInit {
  pokemonList: PokemonDetails[] = [];
  skip = 0;
  searchText = new FormControl('');
  pokemonDetails: PokemonDetails | null = null;

  constructor(
    private pokedexService: PokedexService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pokedexService.getPokemonList(this.skip).subscribe(res => {
      this.pokemonList = res;
      this.skip += 20;
    });
  }

  async loadMore(): Promise<void> {
    this.pokedexService.getPokemonList(this.skip).subscribe(res => {
      console.log(res);
      this.pokemonList = [...this.pokemonList, ...res];
      this.skip += 20;
    });
  }

  async searchPokemon(name: string | null): Promise<void> {
    if (!name) {
      return;
    }

    const searchText = name.toLowerCase();

    const pokemonDetails = await firstValueFrom<PokemonDetails | null>(
      this.pokedexService.getPokemonDetails(searchText).pipe(
        catchError(() => {
          this._snackBar.open('Pokemon Not Found', 'Dismiss', {
            duration: 3000,
          });

          return of(null);
        })
      )
    );

    if (pokemonDetails) {
      this.pokemonDetails = pokemonDetails;
    }
  }

  pokemonData(pokemonData: PokemonDetails | null): void {
    this.pokemonDetails = pokemonData;
  }

  clearPokemonData(): void {
    this.pokemonDetails = null;
  }
}
