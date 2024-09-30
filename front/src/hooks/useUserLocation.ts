import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516,
    longitude: 126.9898,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true, //좀더 정확한 위치를 잡을 수있게함
      },
    );
  }, []);

  return {userLocation, isUserLocationError};
}

export default useUserLocation;
