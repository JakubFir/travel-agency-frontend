import fetch from "unfetch";


const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}


export const fetchBookedTrips = userId =>
    fetch(`/book/${userId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(checkStatus);

export const fetchUserInfo = userId =>
    fetch(`/users/${userId}`, {
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(checkStatus);


