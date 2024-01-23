/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Board from './board/board.tsx';
import {useTranslation} from 'react-i18next';

export default function App(): React.JSX.Element {
  console.log('Render App');
  const {t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const {height, width} = useWindowDimensions();
  const safeScreenSize = height * width;

  const [pokemonList, setPokemonList] = useState<string[]>(
    pokemonListForPlatform(safeScreenSize),
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  function reset() {
    switch (Platform.OS) {
      case 'android':
        setPokemonList(shuffle(getRandomPokemonIds(safeScreenSize / 20000)));
        break;
      case 'ios':
        setPokemonList(shuffle(getRandomPokemonIds(safeScreenSize / 20000)));
        break;
      default:
        setPokemonList(shuffle(getRandomPokemonIds(safeScreenSize / 20000)));
        break;
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.statusBar}>
        {/*<Text style={{color: isDarkMode ? Colors.lighter : Colors.darker}}>*/}
        {/*  {score[0]}:{score[1]}*/}
        {/*</Text>*/}
        <Button title={t('restart')} onPress={() => reset()} />
      </View>
      <View
        style={[
          backgroundStyle,
          {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
        ]}>
        <Board list={pokemonList} />
      </View>
    </SafeAreaView>
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
});

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

function pokemonListForPlatform(safeScreenSize: number) {
  switch (Platform.OS) {
    case 'android':
      return shuffle(getRandomPokemonIds(safeScreenSize / 20000));
    case 'ios':
      return shuffle(getRandomPokemonIds(safeScreenSize / 20000));
    default:
      return shuffle(getRandomPokemonIds(safeScreenSize / 20000));
  }
}
