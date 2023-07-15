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

export const subscribeToNewsletter = (email) => {
    return fetch(`/newsletter/${1}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }).then(checkStatus)
}