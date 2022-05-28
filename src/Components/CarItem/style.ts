import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const CarItemContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  /* background-color: blue; */
  background-color: #2d3748;
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(5)}px;
  width: ${Dimensions.get('screen').width * 0.45}px;
  margin-left: ${RFValue(5)}px;
  margin-right: ${RFValue(5)}px;
  padding: ${RFValue(5)}px;
`;

export const CarItemRow = styled.Text`
  text-align: center;
  color: white;
`;
