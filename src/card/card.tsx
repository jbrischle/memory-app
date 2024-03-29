import {Image, Platform, StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import {DarkTheme, DefaultTheme} from '../GlobalStyles.tsx';

export function Card({
  id,
  showBack = true,
  current = false,
  revealed = false,
}: {
  id: string;
  showBack: boolean;
  current: boolean;
  revealed: boolean;
}): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  let front;
  let back;

  switch (Platform.OS) {
    case 'android':
      front = `asset:/pokemon/${id}.png`;
      back = 'asset:/pokemon/egg.png';
      break;
    case 'ios':
      front = `${id}`;
      back = 'egg';
      break;
    default:
      front = `asset:/pokemon/${id}.png`;
      back = 'asset:/pokemon/egg.png';
      break;
  }

  const styles = StyleSheet.create({
    image: {
      width: 75,
      height: 75,
    },
    front: {
      opacity: 0.5,
    },
    current: {
      backgroundColor: '#eebe86',
    },
    container: {
      backgroundColor: isDarkMode
        ? DarkTheme.colors.card
        : DefaultTheme.colors.card,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 12,
    },
  });

  return (
    <View
      style={[
        styles.container,
        revealed ? styles.front : styles.container,
        current ? styles.current : styles.container,
      ]}>
      <Image source={{uri: showBack ? back : front}} style={styles.image} />
    </View>
  );
}
