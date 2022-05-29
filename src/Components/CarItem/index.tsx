import React from 'react';
import {useTranslation} from '../../i18n';
import {Icon} from '../CarMarker/style';
import {CarItemContainer, CarItemRow} from './style';

interface CarItemProps {
  plate: string;
  speed: number;
  onPress: () => void;
}

export const CarItem = function ({plate, speed, onPress}: CarItemProps) {
  const {t} = useTranslation();

  return (
    <CarItemContainer onPress={onPress}>
      <Icon size={35} source={require('../../assets/car.png')} />
      <CarItemRow>
        {t('car.plate')}: {plate}
      </CarItemRow>
      <CarItemRow>
        {`${speed?.toFixed(2)} ${t('car.kilometersPerHour')}`}
      </CarItemRow>
    </CarItemContainer>
  );
};
