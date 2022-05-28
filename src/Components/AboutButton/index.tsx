import React from 'react';
import {AboutButtonStyle, AboutIcon} from './style';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProps} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export function AboutButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationStackProps>>();

  return (
    <AboutButtonStyle onPress={() => navigation.navigate('About')}>
      <AboutIcon size={35} />
    </AboutButtonStyle>
  );
}
