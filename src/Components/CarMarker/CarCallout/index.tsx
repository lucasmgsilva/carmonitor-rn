import React, {Ref, useEffect, useRef, useState} from 'react';
import {RTDB} from '../../../services/RTDB';
import {Marker as MarkerRNM} from 'react-native-maps';
import {
  CarCalloutArea,
  CarCalloutButton,
  CarCalloutContainer,
  CarCalloutText,
} from './style';

interface CarCalloutProps {
  plate: string;
  markerRef: Ref<MarkerRNM>;
}

export function CarCallout({plate, markerRef}: CarCalloutProps) {
  const [playAlarmSound, setPlayAlarmSound] = useState<boolean>();

  function handleClick() {
    RTDB.carsReference.child(plate).update({
      playAlarmSound: !playAlarmSound,
    });
  }

  useEffect(() => {
    RTDB.carsReference.child(plate).on('value', snapshot => {
      markerRef?.current?.hideCallout();
      setTimeout(() => {
        markerRef?.current?.showCallout();
      }, 200);
      setPlayAlarmSound(snapshot.val().playAlarmSound);
    });
  }, []);

  return (
    <CarCalloutContainer tooltip onPress={handleClick}>
      <CarCalloutArea>
        <CarCalloutText>{plate}</CarCalloutText>
        <CarCalloutButton>
          <CarCalloutText>
            {playAlarmSound ? 'CANCELAR ALARME' : 'TOCAR ALARME'}
          </CarCalloutText>
        </CarCalloutButton>
      </CarCalloutArea>
    </CarCalloutContainer>
  );
}
