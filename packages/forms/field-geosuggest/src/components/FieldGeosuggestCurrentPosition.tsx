import Spinner from '@uidu/spinner';
import React, { useState } from 'react';
import { MapPin } from 'react-feather';

export default function FieldGeosuggestCurrentPosition({ onGeocode }) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentPosition = (e) => {
    e.preventDefault();
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        if (onGeocode) {
          onGeocode(position.coords);
        }
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };
  return (
    <span
      tw="absolute right-0 inset-y-0 px-5 flex items-center"
      onClick={fetchCurrentPosition}
    >
      {isLoading ? <Spinner size="small" /> : <MapPin size={16} />}
    </span>
  );
}
