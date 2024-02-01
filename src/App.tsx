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
import Board from './board/board.tsx';
import {useTranslation} from 'react-i18next';
import {
  GameContext,
  GameDispatchContext,
  gameReducer,
  GameState,
  pokemonListForPlatform,
} from './GameState.tsx';
import {DarkTheme, DefaultTheme} from './GlobalStyles.tsx';

export default function App(): React.JSX.Element {
  const {t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const {height, width} = useWindowDimensions();
  const safeScreenSize = height * width;

  const [game, gameDispatch] = useReducer(gameReducer, {
    pokemonList: pokemonListForPlatform(safeScreenSize),
  } as GameState);

  const safeAreaColor = isDarkMode
    ? DarkTheme.colors.safeArea
    : DefaultTheme.colors.safeArea;

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: safeAreaColor,
    },
    statusBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 10,
    },
    gameArea: {
      flex: 1,
      backgroundColor: isDarkMode
        ? DarkTheme.colors.background
        : DefaultTheme.colors.background,
    },
  });

  function reset() {
    gameDispatch({
      type: 'reset',
      pokemonList: pokemonListForPlatform(safeScreenSize),
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={safeAreaColor} />
      <View style={styles.statusBar}>
        <Button title={t('restart')} onPress={() => reset()} />
      </View>
      <View style={styles.gameArea}>
        <GameContext.Provider value={game}>
          <GameDispatchContext.Provider value={gameDispatch}>
            <Board />
          </GameDispatchContext.Provider>
        </GameContext.Provider>
      </View>
    </SafeAreaView>
  );
}
