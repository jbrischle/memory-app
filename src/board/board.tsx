import React, {useEffect, useState} from 'react';
import {Card} from '../card/card.tsx';
import {
  Button,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

export default function Board({list}: {list: string[]}): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [currentTurn, setCurrentTurn] = useState<Record<number, string>>({});
  const [lastRevealedPair, setLastRevealedPair] = useState({});
  const [revealedPairs, setRevealedPairs] = useState<Record<number, string>>(
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

  function reset() {
    setCurrentTurn({});
    setLastRevealedPair({});
    setRevealedPairs({});
    setScore([0, 0]);
  }

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
      <View style={styles.statusBar}>
        {/*<Text style={{color: isDarkMode ? Colors.lighter : Colors.darker}}>*/}
        {/*  {score[0]}:{score[1]}*/}
        {/*</Text>*/}
        <Button title={'Restart'} onPress={() => reset()} />
      </View>
      <View style={styles.grid}>
        {list.map((pokemonId, index) => (
          <TouchableHighlight
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
  statusBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 50,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
    gap: 5,
  },
});
