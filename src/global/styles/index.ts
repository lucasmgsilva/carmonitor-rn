import {RFValue} from 'react-native-responsive-fontsize';
import {css} from 'styled-components';
import styled from 'styled-components/native';

interface TextProps {
  fontSize?: '3xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  fontWeight?: 'bold' | 'regular';
  align?: 'center' | 'left' | 'right';
  mt?: number;
  ml?: number;
  mr?: number;
}

interface StackProps {
  dir: 'horizontal' | 'vertical';
  align?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
    | 'space-between'
    | 'space-around';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  wrap?: 'wrap' | 'nowrap';
  flex?: number;
  mt?: number;
}

export const Text = styled.Text<TextProps>`
  color: black;
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(10)}px;
  line-height: ${RFValue(25)}px;

  ${({mt}) =>
    mt &&
    css`
      margin-top: ${RFValue(mt)}px;
    `}

  ${({ml}) =>
    ml &&
    css`
      margin-left: ${RFValue(ml)}px;
    `}

    ${({mr}) =>
    mr &&
    css`
      margin-right: ${RFValue(mr)}px;
    `}

    ${({fontWeight}) =>
    fontWeight &&
    css`
      font-weight: ${fontWeight};
    `}

    ${({fontSize}) =>
    fontSize &&
    css`
      font-size: ${fontSize === '3xl'
        ? RFValue(20)
        : fontSize === 'xl'
        ? RFValue(16)
        : fontSize === 'md'
        ? RFValue(14)
        : RFValue(12)}px;
    `}

    ${({align}) =>
    align &&
    css`
      text-align: ${align};
    `}
`;

export const Stack = styled.View<StackProps>`
  flex-direction: ${({dir}) => (dir === 'vertical' ? 'column' : 'row')};
  padding: 0 ${RFValue(8)}px ${RFValue(8)}px;

  ${({align}) =>
    align &&
    css`
      align-items: ${align};
    `}

  ${({justify}) =>
    justify &&
    css`
      justify-content: ${justify};
    `}

    ${({wrap}) =>
    wrap &&
    css`
      flex-wrap: ${wrap};
    `}

    ${({flex}) =>
    flex &&
    css`
      flex: ${flex};
    `}

    ${({mt}) =>
    mt &&
    css`
      margin-top: ${RFValue(mt)}px;
    `}
`;

export const GenericButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border: 1px solid black;
  padding: ${RFValue(8)}px ${RFValue(24)}px;
  border-radius: ${RFValue(8)}px;
  margin-top: ${RFValue(5)}px;
`;
