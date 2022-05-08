import React from 'react';
import {Alert} from 'react-native';
import {
  CarCalloutArea,
  CarCalloutButton,
  CarCalloutContainer,
  CarCalloutText,
} from './style';

interface CarCalloutProps {
  plate: string;
}

export function CarCallout({plate}: CarCalloutProps) {
  function handleClick() {
    Alert.alert('Carro', `Placa: ${plate}`);
    console.log('click');
  }

  return (
    <CarCalloutContainer tooltip>
      <CarCalloutArea onPress={handleClick}>
        <CarCalloutText>{plate}</CarCalloutText>
        <CarCalloutButton>
          <CarCalloutText>TOCAR ALARME</CarCalloutText>
        </CarCalloutButton>
      </CarCalloutArea>
    </CarCalloutContainer>
  );
}
