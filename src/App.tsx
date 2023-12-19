/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Board from './board/board.tsx';

export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {height, width} = useWindowDimensions();
  const safeScreenSize = height * width;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  let list;

  switch (Platform.OS) {
    case 'android':
      list = shuffle(getRandomPokemonIds(safeScreenSize / 20000));
      break;
    case 'ios':
      list = shuffle(getRandomPokemonIds(safeScreenSize / 20000));
      break;
    default:
      list = shuffle(getRandomPokemonIds(safeScreenSize / 20000));
      break;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={[
          backgroundStyle,
          {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
        ]}>
        <Board list={list} />
      </View>
    </SafeAreaView>
  );
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
