import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const CarContainer = styled.ScrollView.attrs({
  horizontal: true,
})`
  width: 100%;
  max-height: ${Dimensions.get('screen').height * 0.15}px;
  padding-bottom: ${RFValue(5)}px;
`;
