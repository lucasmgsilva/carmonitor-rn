import React from 'react';
import {CarContainer} from './style';

interface CarAreaSliderProps {
  children: React.ReactNode;
}

export const CarAreaSlider = function ({children}: CarAreaSliderProps) {
  return <CarContainer>{children}</CarContainer>;
};
