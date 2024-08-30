"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const nearbyVolunteers = await User.find({
//     isOnline: true,
//     location: {
//         $nearSphere: {
//             $geometry: {
//                 type: 'Point',
//                 coordinates: [longitude, latitude],
//             },
//             $maxDistance: 2000, // 2 km
//         },
//     },
// });
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        }
        else {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            }, (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error('User denied the request for Geolocation.'));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error('Location information is unavailable.'));
                        break;
                    case error.TIMEOUT:
                        reject(new Error('The request to get user location timed out.'));
                        break;
                    default:
                        reject(new Error('An unknown error occurred.'));
                        break;
                }
            });
        }
    });
}
// Example of using the function
getUserLocation()
    .then((location) => {
    console.log('User Location:', location);
    // Use the location to send to the server or perform other actions
})
    .catch((error) => {
    console.error('Error getting location:', error.message);
});
