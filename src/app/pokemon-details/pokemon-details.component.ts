import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PokemonDetails } from './pokemon.interface';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import {
  MatCardContent,
  MatCardTitle,
  MatCardHeader,
  MatCardModule,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { UnityConverterPipe } from '../unity-converter.pipe';
import { MatList, MatListItem } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBar } from '@angular/material/progress-bar';
import { StatPercentPipe } from '../stat-percent.pipe';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatDivider,
    CommonModule,
    UnityConverterPipe,
    MatListItem,
    MatList,
    MatChipsModule,
    MatProgressBar,
    StatPercentPipe,
    MatGridList,
    MatGridTile,
    MatIcon,
    NgClass,
    MatButtonModule,
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent implements OnInit {
  @Input({ required: true }) pokemonData: PokemonDetails | null = null;
  @Output() clearPokemonData = new EventEmitter<void>();

  currentBreakpoint = '';
  mainContainerClass: object = {
    'main-card': true,
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small])
      .subscribe(result => {
        if (result.matches) {
          this.breakpointChanged();
        }
      });
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
    }
    this.setMainContainerClass();
  }

  setMainContainerClass() {
    this.mainContainerClass = {
      'main-container': this.currentBreakpoint !== Breakpoints.Small,
      'main-container-sm': this.currentBreakpoint === Breakpoints.Small,
    };
  }
}
