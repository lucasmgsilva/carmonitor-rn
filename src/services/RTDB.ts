import database from '@react-native-firebase/database';

const carsReference = database().ref('/cars/');

export const RTDB = {
  carsReference,
};
