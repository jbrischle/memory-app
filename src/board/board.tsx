import React, {useEffect, useState} from 'react';
import {Card} from '../card/card.tsx';
import {Dimensions, StyleSheet, TouchableHighlight, View} from 'react-native';

export default function Board({list}: {list: string[]}): React.JSX.Element {
  const [currentTurn, setCurrentTurn] = useState({} as Record<number, string>);
  const [revealedPairs, setRevealedPairs] = useState(
    {} as Record<number, string>,
  );

  useEffect(() => {
    function checkIfIsPair(local: {[p: number]: string}): void {
      const [first, second] = Object.values(local);
      if (first && second && first === second) {
        setRevealedPairs({...revealedPairs, ...local});
      }
    }

    checkIfIsPair(currentTurn);
  });

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
      !Object.keys(revealedPairs).includes(index.toString())
    );
  }

  function isRevealed(index: number) {
    return Object.keys(revealedPairs).includes(index.toString());
  }

  return (
    <View style={styles.grid}>
      {list.map((entry, index) => (
        <TouchableHighlight key={index} onPress={() => onClick(entry, index)}>
          <View style={isRevealed(index) ? styles.card__revealed : styles.card}>
            <Card id={entry} showBack={shouldShowBack(index)} />
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
}

const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    height: ScreenHeight,
  },
  card: {
    borderStyle: 'solid',
    borderColor: '#a6a098',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#a6a098',
    display: 'flex',
    justifyContent: 'center',
  },

  card__revealed: {
    borderStyle: 'solid',
    borderColor: '#a6a098',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#a6a098',
    display: 'flex',
    justifyContent: 'center',
    opacity: 50,
  },
});
