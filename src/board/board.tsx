import React, {useEffect, useState} from 'react';
import {Card} from '../card/card.tsx';
import {Dimensions, StyleSheet, TouchableHighlight, View} from 'react-native';

export default function Board({list}: {list: string[]}): React.JSX.Element {
  const [currentTurn, setCurrentTurn] = useState({} as Record<number, string>);
  const [lastRevealedPair, setLastRevealedPair] = useState(
    {} as Record<number, string>,
  );
  const [revealedPairs, setRevealedPairs] = useState(
    {} as Record<number, string>,
  );

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

  function isInCurrentTurn(index: number) {
    return Object.keys(currentTurn).includes(index.toString());
  }

  return (
    <View>
      <View style={styles.score}></View>
      <View style={styles.grid}>
        {list.map((pokemonId, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => onClick(pokemonId, index)}>
            <Card
              id={pokemonId}
              showBack={shouldShowBack(index)}
              current={isInCurrentTurn(index)}
            />
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  score: {},
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    height: ScreenHeight,
    padding: 50,
    alignContent: 'center',
  },
});
