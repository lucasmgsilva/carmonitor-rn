import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationStackProps} from '../App';
import {Icon} from '../components/CarMarker/style';
import {GenericButton, Stack, Text} from '../global/styles';
import {useTranslation} from '../i18n';

export function About() {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationStackProps>>();

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack dir="horizontal" justify="center" mt={20}>
          <Icon size={100} source={require('../assets/car.png')} />
        </Stack>

        <Text ml={15} mr={15} mt={12} fontSize="3xl" fontWeight="bold">
          {t('about.whatIsIt')}
        </Text>
        <Text ml={30} mr={15}>
          {t('about.aboutTheApp')}
        </Text>

        <Text ml={15} mr={15} mt={12} fontSize="3xl" fontWeight="bold">
          {t('about.availableResources')}
        </Text>
        <Text ml={30} mr={15}>
          • {t('about.trackTheVehicles')};
        </Text>
        <Text ml={30} mr={15} mt={-6}>
          • {t('about.monitorSpeed')};
        </Text>
        <Text ml={30} mr={15} mt={-6}>
          • {t('about.triggerAlarm')}.
        </Text>

        <Text ml={15} mr={15} mt={12} fontSize="3xl" fontWeight="bold">
          {t('about.whoDeveloped')}
        </Text>
        <Text ml={30} mr={15}>
          - Lucas Matheus Gomes da Silva;
        </Text>
        <Text ml={30} mr={15} mt={-6}>
          - Luciano Moises Ventorine.
        </Text>

        <Stack dir="horizontal" justify="center" mt={20}>
          <GenericButton onPress={() => navigation.goBack()}>
            <Text fontWeight="bold">{t('buttons.turnBack').toUpperCase()}</Text>
          </GenericButton>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
