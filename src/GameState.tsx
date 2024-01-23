import {createContext, Dispatch} from 'react';
import {Platform} from 'react-native';

export type GameState = {
  pokemonList: string[];
};

export const GameContext = createContext<GameState>({
  pokemonList: [],
});
export const GameDispatchContext = createContext<Dispatch<GameAction>>(
  () => {},
);

type GameResetAction = {type: 'reset'; pokemonList: string[]};
type GameTestAction = {type: 'test'};
type GameAction = GameResetAction | GameTestAction;

export function gameReducer(state: GameState, action: GameAction) {
  let updatedState = state;
  switch (action.type) {
    case 'reset':
      updatedState = {...state, pokemonList: action.pokemonList};
      break;
  }

  return updatedState;
}

export function pokemonListForPlatform(safeScreenSize: number) {
  switch (Platform.OS) {
    case 'android':
      return shuffle(getRandomPokemonIds(safeScreenSize / 20000));
    case 'ios':
      return shuffle(getRandomPokemonIds(safeScreenSize / 20000));
    default:
      return shuffle(getRandomPokemonIds(safeScreenSize / 20000));
  }
}

function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getRandomPokemonIds(count: number) {
  const number = new Set<string>();

  while (number.size < count) {
    const min = Math.ceil(1);
    const max = Math.floor(649);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    number.add(num.toString());
  }

  return [...Array.from(number), ...Array.from(number)];
}
