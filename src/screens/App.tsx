import React, {useEffect, useState} from 'react';
import {SafeAreaView, Platform, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const App = () => {
  const [region, setRegion] = useState<Region>();
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);

  function requestLocationPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(() => {
      console.log('Permissão concedida!');
      setHasLocationPermission(true);
    });
  }

  function onMapReady() {
    Platform.OS === 'android' && requestLocationPermission();
  }

  function getUserLocation() {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
          console.log({
            latitude,
            longitude,
          });
        },
        error => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      requestLocationPermission();
    }
  }

  useEffect(() => {
    getUserLocation();
  }, [hasLocationPermission]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        onMapReady={onMapReady}
        style={{flex: 1}}
        /* initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} */
        region={region}
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
      />
    </SafeAreaView>
  );
};

export default App;
