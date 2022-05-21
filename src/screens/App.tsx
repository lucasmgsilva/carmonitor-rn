import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Platform, PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {CarMarker} from '../Components/CarMarker';
import {CarAreaSlider} from '../Components/CarAreaSlider';
import {CarItem} from '../Components/CarItem';
import {RTDB} from '../services/RTDB';

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
  id: string;
  playAlarmSound: boolean;
  location: Location;
}

const App = () => {
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
  const [region, setRegion] = useState<Region>();
  const [cars, setCars] = useState<Car[]>([]);
  const mapViewRef = useRef<MapView>();

  const latitudeDelta = 0.0143;
  const longitudeDelta = 0.0134;

  function requestLocationPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(value => {
      setHasLocationPermission(true);
    });
  }

  function getUserLocation() {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          });
          console.log('User: ', {latitude, longitude});
        },
        error => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }
  }

  function handleMapReady() {
    Platform.OS === 'android' && requestLocationPermission();
  }

  function handleCarItemClick(location: Location) {
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta,
      longitudeDelta,
    });
  }

  useEffect(() => {
    RTDB.carsReference.on('value', snapshot => {
      const updatedCars = [] as Car[];

      snapshot.forEach(child => {
        const newCar = {
          id: child.key,
          ...child.val(),
        };
        updatedCars.push(newCar);
        console.log('Car: ', newCar);
      });

      setCars(updatedCars);
    });

    getUserLocation();
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [hasLocationPermission]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}>
      <MapView
        ref={mapViewRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        initialRegion={region}
        //region={region}
        //onRegionChange={}
        rotateEnabled={false}
        scrollEnabled={true}
        zoomEnabled={false}
        minZoomLevel={19}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsUserLocation={true}
        loadingEnabled={true}
        onMapReady={handleMapReady}
        //onLongPress={addMarker}
      >
        {cars?.map((car, index) => (
          <CarMarker
            key={index}
            coordinate={{
              latitude: car?.location?.lat,
              longitude: car?.location?.lng,
            }}
            plate={car?.id}
          />
        ))}
      </MapView>
      <CarAreaSlider>
        <>
          {cars?.map((car, index) => (
            <CarItem
              key={index}
              plate={car?.id}
              speed={car.location.speed}
              onPress={() => handleCarItemClick(car?.location)}
            />
          ))}
        </>
      </CarAreaSlider>
    </SafeAreaView>
  );
};

export default App;
