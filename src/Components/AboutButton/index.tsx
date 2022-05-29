import React from 'react';
import {AboutButtonStyle} from './style';
import {useNavigation} from '@react-navigation/native';
import {NavigationStackProps} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon} from '../CarMarker/style';

export function AboutButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationStackProps>>();

  return (
    <AboutButtonStyle onPress={() => navigation.navigate('About')}>
      <Icon size={40} source={require('../../assets/about.png')} />
    </AboutButtonStyle>
  );
}
