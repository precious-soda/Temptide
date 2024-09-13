# Temptide - Weather and Geolocation App

**Temptide** is a React Native application designed to provide current weather, hourly forecasts, air quality index, and other weather-related data based on the user's geolocation or manual search. It leverages the OpenWeatherMap API for weather data and LocationIQ for reverse geocoding, offering a user-friendly interface to keep you updated with real-time weather conditions.

## Features

- **Current Weather:** Display the current temperature, weather conditions, wind speed, humidity, and more.
- **Hourly Forecast:** Provides an hourly weather forecast to plan your day efficiently.
- **Air Quality Index (AQI):** Displays real-time air quality information to help you stay healthy.
- **Location Search:** Allows users to search for weather data by entering a location manually.
- **Geolocation:** Fetches weather data based on the user's current location with precise accuracy.
- **Permissions Handling:** Requests location permissions from the user and handles geolocation access gracefully.

## Technologies Used

- **React Native:** A framework for building native apps using React.
- **React Navigation:** Manages screen transitions and navigation within the app.
- **Axios:** Handles API requests to OpenWeatherMap and LocationIQ.
- **React Native Geolocation Service:** Provides access to the device's geolocation.
- **OpenWeatherMap API:** Fetches weather data and air quality information.
- **LocationIQ API:** Provides reverse geocoding services to convert coordinates into readable addresses.
- **Environment Variables:** Manages sensitive data such as API keys securely using `.env` files.

## Prerequisites

- Node.js installed (v14.x or above recommended)
- React Native CLI or Expo CLI
- Android Studio or Xcode (for running on a physical device/emulator)
- Git installed

## Getting Started

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/temptide.git
cd temptide

### 2.Install Dependencies

npm install

### 3. Set Up Environment Variables

Create a .env file in the root directory of the project and add your API keys:

OPENWEATHER_API_KEY=your_openweathermap_api_key
LOCATIONIQ_API_KEY=your_locationiq_api_key

### 4.Running the Application

npx react-native run-android

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

```
