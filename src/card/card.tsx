import {Image, Platform, StyleSheet, View} from 'react-native';
import React from 'react';

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

  return (
    <View
      style={[
        styles.container,
        current ? styles.current : styles.container,
        revealed ? styles.front : styles.container,
      ]}>
      <Image source={{uri: showBack ? back : front}} style={styles.image} />
    </View>
  );
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
    borderColor: '#746e66',
    backgroundColor: '#746e66',
  },
  container: {
    borderColor: '#a6a098',
    borderRadius: 12,
    backgroundColor: '#a6a098',
    display: 'flex',
    justifyContent: 'center',
  },
});
