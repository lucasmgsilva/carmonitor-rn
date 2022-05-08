import React, {useEffect, useState} from 'react';
import {RTDB} from '../../../services/RTDB';
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
  const [playAlarmSound, setPlayAlarmSound] = useState<boolean>();

  function handleClick() {
    RTDB.carsReference.child(plate).update({
      playAlarmSound: !playAlarmSound,
    });
  }

  useEffect(() => {
    RTDB.carsReference.child(plate).on('value', snapshot => {
      console.log('playAlarmSound: ', snapshot.val().playAlarmSound);
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
