import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';

export const AboutButtonStyle = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding-top: ${RFValue(12)}px;
  padding-left: ${RFValue(10)}px;
`;

export const AboutIcon = styled(AntDesign).attrs({
  name: 'questioncircle',
})`
  color: #0f151a;
`;
