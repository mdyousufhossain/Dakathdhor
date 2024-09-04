'use client';

import React, { useState } from 'react';

const GoogleMapsButton = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetDirections = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`);

          // Update the state with current accuracy and location
          setLocation({ lat: latitude, lng: longitude });

          // Open Google Maps with the obtained location
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${latitude},${longitude}&travelmode=walking`;

          window.open(googleMapsUrl, '_blank');

          setError(null);
        },
        (error) => {
          setError('Error getting location: ' + error.message);
          setLocation(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError('Geolocation is not available in your browser');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <button
        onClick={handleGetDirections}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Get Directions
      </button>
      {location && (
        <div className="mt-2 text-green-500">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsButton;
