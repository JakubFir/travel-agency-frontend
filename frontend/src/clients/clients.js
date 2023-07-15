import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getTrips = () => 
    fetch("/trips")
        .then(checkStatus);

export const getFlights = (tripId,userId,flightRequest) =>
    fetch(`/flight/${tripId}/${userId}`, {
      method: 'POST',
      body: JSON.stringify(flightRequest),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(checkStatus);

export const getHotels = (destination) =>
  fetch(`/hotels/${destination}`).then(checkStatus)
