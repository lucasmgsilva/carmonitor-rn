import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IconProps {
  size: number;
}

export const IconArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.Image<IconProps>`
  width: ${({size}) => RFValue(size)}px;
  height: ${({size}) => RFValue(size)}px;
`;

export const Triangle = styled.Image<IconProps>`
  width: ${({size}) => RFValue(size)}px;
  height: ${({size}) => RFValue(size)}px;
`;
