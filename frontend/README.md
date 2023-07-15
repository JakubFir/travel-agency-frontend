# Getting Started with Travel Agency Frontend

Backend link: [https://github.com/JakubFir/travel-agency](https://github.com/JakubFir/travel-agency)

To run the frontend, please make sure to read the backend readme and have a Docker container of the backend app already set up. Once the backend is ready, you can proceed with building the frontend.

## Building the Frontend:
1. Change directory to the frontend folder by entering `cd frontend` in the terminal.
2. Build the frontend image by executing the following command: `docker build -t travel-frontend .` This command will create a frontend image based on the Dockerfile in the current directory.
3. Run the frontend container in detached mode on port 3000 with the command: `docker run -d -p 3000:3000 -t travel-frontend`.
4. Once both the backend and frontend containers are running, you can access the main features of the application through the frontend interface at `localhost:3000`.

## Available Features:
The travel agency frontend provides the following features:

1. User Authentication: Users can authenticate/login by sending a POST request to `/jwt/login`.

2. Trip Booking: Users can book a trip by sending a POST request to `/book/${userId}` with trip details provided in the request body.

3. Retrieve Trips: Users can retrieve a list of trips by sending a GET request to `/trips`.

4. Fetch Flights: Flights for a specific trip and user can be retrieved by sending a POST request to `/flight/${tripId}/${userId}`.

5. Fetch Hotels: Hotels for a specific destination can be retrieved by sending a GET request to `/hotels/${destination}`.

6. Fetch Hotels by Coordinates: Hotels can be fetched based on reservation information by sending a POST request to `/hotels`.

7. Subscribe to Newsletter: Users can subscribe to the newsletter by sending a POST request to `/newsletter/${1}`.

8. User Registration: New users can register by sending a POST request to `/register`.

9. Fetch Booked Trips: Users can retrieve their booked trips by sending a GET request to `/book/${userId}`.

10. Fetch User Information: User information can be retrieved by sending a GET request to `/users/${userId}`.

Please note that some additional features, such as adding a new trip, creating a newsletter to subscribe to or performing specific actions, may be available through Postman. Please refer to the backend documentation for instructions on how to access and use those features.


Feel free to reach out if you need any further assistance.
