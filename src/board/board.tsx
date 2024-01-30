import React, {useContext, useEffect, useState} from 'react';
import {Card} from '../card/card.tsx';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {GameContext} from '../GameState.tsx';

export default function Board(): React.JSX.Element {
  const game = useContext(GameContext);
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [currentTurn, setCurrentTurn] = useState<Record<number, string>>({});
  const [lastRevealedPair, setLastRevealedPair] = useState({});
  const [revealedPairs, setRevealedPairs] = useState<Record<number, string>>(
    {} as Record<number, string>,
  );

  useEffect(() => {
    setCurrentTurn({});
    setLastRevealedPair({});
    setRevealedPairs({});
    setScore([0, 0]);
  }, [game]);

  useEffect(() => {
    const [first, second] = Object.values(currentTurn);
    setLastRevealedPair(currentTurn);

    if (first && second && first === second) {
      setRevealedPairs({...revealedPairs, ...currentTurn});
      setCurrentTurn({});
    }
  }, [currentTurn, revealedPairs]);

  function onClick(entry: string, index: number) {
    const local = {...currentTurn};

    if (Object.keys(local).length >= 2) {
      setCurrentTurn({[index]: entry});
    } else {
      local[index] = entry;
      setCurrentTurn(local);
    }
  }

  function shouldShowBack(index: number) {
    return (
      !Object.keys(currentTurn).includes(index.toString()) &&
      !Object.keys(revealedPairs).includes(index.toString()) &&
      !Object.keys(lastRevealedPair).includes(index.toString())
    );
  }

  function isAlreadyRevealed(index: number) {
    return Object.keys(revealedPairs).includes(index.toString());
  }

  function isInCurrentTurn(index: number) {
    return Object.keys(currentTurn).includes(index.toString());
  }

  return (
    <View>
      <View style={styles.grid}>
        {game.pokemonList.map((pokemonId, index) => (
          <TouchableHighlight
            style={styles.card}
            key={index}
            onPress={() => onClick(pokemonId, index)}
            disabled={isAlreadyRevealed(index) || isInCurrentTurn(index)}>
            <Card
              id={pokemonId}
              showBack={shouldShowBack(index)}
              current={isInCurrentTurn(index)}
              revealed={isAlreadyRevealed(index)}
            />
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
    gap: 5,
  },
  card: {
    borderRadius: 12,
  },
});
