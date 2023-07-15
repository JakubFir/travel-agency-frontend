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

export const registerUser = registerRequest =>
    fetch("/register", {
        method: 'POST',
        body: JSON.stringify(registerRequest),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(checkStatus);
