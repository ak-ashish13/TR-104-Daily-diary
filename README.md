
## Tech Stack

-   HTML
-   CSS
-   JavaScript
-   React
-   Material UI
-   React Router

## Features

-   **User Authentication:** Users can sign up for an account or log in with existing credentials.
-   **Flight Search:** Search for available flights between two cities/airports.
-   **Train Search:** Find trains between two cities or junctions.
-   **Bus Search:** Search for buses between two cities.
-   **Hotel Search:** Look for hotels in a specific city.
-   **Ticket Booking:** Users can book tickets for flights, trains, and buses.
-   **Hotel Room Booking:** Book rooms in hotels.

## Installation

### 1. Install dependencies

From the repository root run:

```
npm run install:client
npm run install:server
```

### 2. Start everything with one command

From the project root run:

```
npm start
```

This boots the backend (Express + MongoDB) and the React frontend simultaneously. The client expects the API at [http://localhost:5000](http://localhost:5000) by default. Update `client/.env` or `server/.env` if you need different hosts/ports.

### 3. Visit the app

Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.
