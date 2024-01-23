/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useReducer} from 'react';
import {
  Button,
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
import {
  GameContext,
  GameDispatchContext,
  gameReducer,
  GameState,
  pokemonListForPlatform,
} from './GameState.tsx';

export default function App(): React.JSX.Element {
  const {t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const {height, width} = useWindowDimensions();
  const safeScreenSize = height * width;

  const [game, gameDispatch] = useReducer(gameReducer, {
    pokemonList: pokemonListForPlatform(safeScreenSize),
  } as GameState);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  function reset() {
    gameDispatch({
      type: 'reset',
      pokemonList: pokemonListForPlatform(safeScreenSize),
    });
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
        <GameContext.Provider value={game}>
          <GameDispatchContext.Provider value={gameDispatch}>
            <Board />
          </GameDispatchContext.Provider>
        </GameContext.Provider>
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
