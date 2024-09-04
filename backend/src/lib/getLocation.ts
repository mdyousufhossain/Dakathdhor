
/**
 * 
 * problem is typical navigator have no manner they just provide wrong location we need exac location 
 */

function reverseGeocode(lat : number, lng : number) {
  // Simple function to find the nearest location
  let closestLocation = null;
  let closestDistance = Infinity;

  for (const location of locations) {
    const distance = Math.sqrt(
      Math.pow(location.lat - lat, 2) + Math.pow(location.lng - lng, 2)
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestLocation = location;
    }
  }

  if (closestLocation) {
    console.log(closestLocation.address)
    return closestLocation.address;
  } else {
    return 'Location not found in the database';
  }
}

// Example usage
// const userLatitude = 37.7749;
// const userLongitude = -122.4194;

// const address = reverseGeocode(userLatitude, userLongitude);
//console.log('Address:', address);

async function getUserLocation(): Promise<{ latitude: number; longitude: number }> {
    return await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
            reverseGeocode(latitude,longitude)
          },
          (error) => {
            console.warn('Browser Geolocation error:', error);
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0,
          }
        );
      }
    });
  }

  

export default getUserLocation