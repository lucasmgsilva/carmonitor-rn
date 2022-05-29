import React, {Ref, useEffect, useState} from 'react';
import {RTDB} from '../../../services/RTDB';
import {Marker as MarkerRNM} from 'react-native-maps';
import {
  CarCalloutArea,
  CarCalloutButton,
  CarCalloutContainer,
  CarCalloutText,
} from './style';
import {useTranslation} from '../../../i18n';

interface CarCalloutProps {
  plate: string;
  speed: number;
  markerRef: Ref<MarkerRNM>;
}

export function CarCallout({plate, speed, markerRef}: CarCalloutProps) {
  const {t} = useTranslation();
  const [playAlarmSound, setPlayAlarmSound] = useState<boolean>();

  function handleClick() {
    RTDB.carsReference.child(plate).update({
      playAlarmSound: !playAlarmSound,
    });
  }

  useEffect(() => {
    markerRef?.current?.hideCallout();
    setTimeout(() => {
      markerRef?.current?.showCallout();
    }, 200);
  }, [markerRef, playAlarmSound]);

  useEffect(() => {
    RTDB.carsReference.child(plate).on('value', snapshot => {
      setPlayAlarmSound(snapshot.val().playAlarmSound);
    });
  }, [plate]);

  return (
    <CarCalloutContainer tooltip onPress={handleClick}>
      <CarCalloutArea>
        <CarCalloutText>{plate}</CarCalloutText>
        <CarCalloutText>
          {speed > 5 ? speed.toFixed(2) : (0).toFixed(2)}{' '}
          {t('car.kilometersPerHour')}
        </CarCalloutText>
        <CarCalloutButton>
          <CarCalloutText>
            {playAlarmSound
              ? t('alarm.cancel').toUpperCase()
              : t('alarm.play').toUpperCase()}
          </CarCalloutText>
        </CarCalloutButton>
      </CarCalloutArea>
    </CarCalloutContainer>
  );
}
