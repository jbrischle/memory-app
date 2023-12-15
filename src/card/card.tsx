import {Image, Platform} from 'react-native';
import React from 'react';

export function Card({
  id,
  showBack = true,
}: {
  id: string;
  showBack: boolean;
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

  if (showBack) {
    return (
      <Image
        source={{uri: back}}
        width={50}
        height={50}
        style={{width: 50, height: 50}}
      />
    );
  } else {
    return (
      <Image
        source={{uri: front}}
        width={50}
        height={50}
        style={{width: 50, height: 50}}
      />
    );
  }
}
