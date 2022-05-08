import React from 'react';
import {Marker as MarkerRNM} from 'react-native-maps';
import {CarCallout} from './CarCallout';
import {Icon, IconArea} from './style';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MarkerProps {
  coordinate: Coordinate;
  plate: string;
}

export const CarMarker = function ({coordinate, plate}: MarkerProps) {
  return (
    <MarkerRNM coordinate={coordinate}>
      <IconArea>
        <Icon size={35} source={require('../../assets/car.png')} />
        <Icon size={10} source={require('../../assets/triangle.png')} />
      </IconArea>
      <CarCallout plate={plate} />
    </MarkerRNM>
  );
};
