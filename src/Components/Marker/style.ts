import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IconProps {
  size: number;
}

export const Icon = styled.Image<IconProps>`
  width: ${({ size }) => RFValue(size)}px;
  height: ${({ size }) => RFValue(size)}px;
`;
