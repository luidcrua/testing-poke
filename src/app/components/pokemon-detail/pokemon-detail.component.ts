
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private pokeService: PokeService) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if(name)
      this.pokeService.getPokemonDetails(name).subscribe({
        next: (data) => (this.pokemon = data),
        error: (err) => console.error('Failed to load Pokémon details', err),
      });
  }

  addFavorite(): void {
    this.pokeService.saveFavorite(this.pokemon);
  }
}
    