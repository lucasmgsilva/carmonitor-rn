import React, {useEffect, useState} from 'react';
import {SafeAreaView, Platform, PermissionsAndroid} from 'react-native';
import MapView, { MapEvent, Marker } from 'react-native-maps';
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
  const [markers, setMarkers] = useState<any[]>([]);

  function requestLocationPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(value => {
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
  }, []);

  function addMarker (event: MapEvent){
    setMarkers([...markers, {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      /*title: 'Marker Title',
      description: 'Marker Description',*/
    }]);

    setRegion({
      ...region,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    } as Region);
    
    console.log(event.nativeEvent.coordinate);
  }

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
        loadingEnabled={true}
        onLongPress={addMarker}
      >
        {
          markers?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                ...marker
              }}
              pinColor='#ff0000'
            />
          ))
        }
      </MapView>
    </SafeAreaView>
  );
};

export default App;
