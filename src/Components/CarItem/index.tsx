import React from 'react';
import {Icon} from '../CarMarker/style';
import {CarItemContainer, CarItemRow} from './style';

interface CarItemProps {
  plate: string;
  speed: number;
  onPress: () => void;
}

export const CarItem = function ({plate, speed, onPress}: CarItemProps) {
  return (
    <CarItemContainer onPress={onPress}>
      <Icon size={35} source={require('../../assets/car.png')} />
      <CarItemRow>Placa: {plate}</CarItemRow>
      <CarItemRow>
        Vel.: {speed > 5 ? speed.toFixed(2) : (0).toFixed(2)} Km/h
      </CarItemRow>
    </CarItemContainer>
  );
};
