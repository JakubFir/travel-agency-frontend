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

export const bookTrip = (trip,userId) =>
    fetch(`/book/${userId}`, {
        method: 'POST',
        body: JSON.stringify(trip),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkStatus);