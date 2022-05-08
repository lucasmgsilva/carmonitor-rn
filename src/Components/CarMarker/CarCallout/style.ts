import {RFValue} from 'react-native-responsive-fontsize';
import {Callout} from 'react-native-maps';
import styled from 'styled-components/native';

export const CarCalloutContainer = styled(Callout)`
  align-items: center;
  justify-content: center;
  width: ${RFValue(250)}px;
  border-radius: ${RFValue(8)}px;
  display: flex;
`;

export const CarCalloutArea = styled.View`
  align-items: center;
  background-color: #2d3748;
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
`;

export const CarCalloutText = styled.Text`
  font-weight: bold;
  color: white;
`;

export const CarCalloutButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border: 1px solid #ffc107;
  padding: ${RFValue(8)}px ${RFValue(24)}px;
  border-radius: ${RFValue(8)}px;
  margin-top: ${RFValue(5)}px;
`;
