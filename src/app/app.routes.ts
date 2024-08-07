import { Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

export const routes: Routes = [
  { path: '', component: PokedexComponent },
  { path: 'details', component: PokemonDetailsComponent },
];
