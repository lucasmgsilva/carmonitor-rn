import React from 'react';
import {Marker as MarkerRNM} from 'react-native-maps';
import {Icon, IconArea} from './style';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MarkerProps {
  coordinate: Coordinate;
  title: string;
  description?: string;
}

export const CarMarker = function ({
  coordinate,
  title,
  description,
}: MarkerProps) {
  return (
    <MarkerRNM coordinate={coordinate} title={title} description={description}>
      <IconArea>
        <Icon size={35} source={require('../../assets/car.png')} />
        <Icon size={10} source={require('../../assets/triangle.png')} />
      </IconArea>
    </MarkerRNM>
  );
};
