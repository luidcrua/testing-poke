
import { Component, OnInit } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList = [];
  searchQuery = '';
  offset = 0;

  constructor(private pokeService: PokeService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokeService.getPokemonList(this.offset).subscribe({
      next: (data) => {
        this.pokemonList = [...this.pokemonList, ...data.results];
      },
      error: (err) => console.error('Failed to load Pokémon', err),
    });
  }

  searchPokemon(): void {
    if (this.searchQuery.trim()) {
      this.pokeService.getPokemonDetails(this.searchQuery.toLowerCase()).subscribe({
        next: (pokemon) => {
          this.pokemonList = [pokemon];
        },
        error: (err) => console.error('Failed to search Pokémon', err),
      });
    }
  }

  viewDetails(name: string): void {
    this.router.navigate([`/pokemon/${name}`]);
  }

  loadMore(): void {
    this.offset += 20;
    this.loadPokemon();
  }
}
    