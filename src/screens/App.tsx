import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Alert,
  View,
} from 'react-native';
import MapView, {MapEvent, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {Icon, IconArea, Triangle} from '../Components/Marker/style';

const carsReference = database().ref('/cars/');

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Location {
  lat: number;
  lng: number;
  speed: number;
}

interface Car {
  id?: string;
  location: Location;
}

const App = () => {
  const [region, setRegion] = useState<Region>();
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const [cars, setCars] = useState<Car[]>([] as Car[]);

  useEffect(() => {
    carsReference.on('value', snapshot => {
      const updatedCars = [];

      snapshot.forEach(child => {
        let newCar = {
          id: child.key,
          ...child.val(),
        };
        console.log('Car:', newCar);
        updatedCars.push(child.val() as Car);
      });

      setCars(updatedCars);
    });
  }, []);

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

  function addMarker(event: MapEvent) {
    setMarkers([
      ...markers,
      {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        /*title: 'Marker Title',
      description: 'Marker Description',*/
      },
    ]);

    Alert.alert('Marker added!');

    /*firestore().collection('markers').add({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        createdAt: firestore.FieldValue.serverTimestamp(),
    }).then(() => {
        Alert.alert('Marker added!');
    }).catch(() => {
        Alert.alert('Error adding marker!');
    });*/

    /* setRegion({
      ...region,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    } as Region); */

    console.log(event.nativeEvent.coordinate);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        onMapReady={onMapReady}
        style={{flex: 1}}
        initialRegion={{
          latitude: -21.615968,
          longitude: -49.067915,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}
        rotateEnabled={false}
        zoomEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        loadingEnabled={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        onLongPress={addMarker}>
        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              ...marker,
            }}
            pinColor="#ff0000"
            /*icon={require('../assets/car.png')}*/
          />
        ))}

        {cars?.map((car, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: car?.location?.lat,
              longitude: car?.location?.lng,
            }}
            title="Marker Title"
            description="Marker Description">
            <IconArea>
              <Icon size={35} source={require('../assets/car.png')} />
              <Icon size={15} source={require('../assets/triangle.png')} />
            </IconArea>
          </Marker>
        ))}

        {/* {cars?.map((car, index) => {
          console.log('CAR: ', car);

          return (
            car?.location && (
              <Marker
                key={index}
                coordinate={{
                  latitude: car?.location?.lat,
                  longitude: car?.location?.lng,
                }}>
                <Icon size={35} source={require('../assets/car.png')} />
              </Marker>
            );
          );
        })} */}
      </MapView>
    </SafeAreaView>
  );
};

export default App;
