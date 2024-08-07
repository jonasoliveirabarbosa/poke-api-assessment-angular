interface NamedAPIResource {
  name: string;
  url: string;
}

interface PokemonSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

interface Item {
  item: NamedAPIResource;
  version_details: {
    rarity: number;
    version: NamedAPIResource;
  }[];
}

interface Move {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
}

interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface PokemonDetails {
  id: number;
  name: string;
  base_experience: string;
  height: string;
  weight: string;
  is_default: boolean;
  order: number;
  abilities: {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
  }[];
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  held_items: Item[];
  moves: Move[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  cries: {
    latest: string;
    legacy: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
  }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
  past_types: {
    generation: NamedAPIResource;
    types: {
      slot: number;
      type: NamedAPIResource;
    }[];
  }[];
}
