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


export const authenticateUser = authRequest =>
    fetch("/jwt/login", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(authRequest)
    }).then(checkStatus);


