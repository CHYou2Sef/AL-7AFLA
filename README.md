
# Hafla - Suivi de Transport Scolaire

Hafla is a modern, mobile-first React application designed for parents to track their children's school bus in real-time. It features a responsive UI, live map tracking, notifications, and profile management.

## Features

*   **Real-time Bus Tracking**: Visualize the bus position on an interactive map (Leaflet).
*   **Live Notifications**: Receive updates for arrival, delays, or incidents.
*   **Dark Mode**: A sleek dark theme optimized for night usage.
*   **Multi-language Support**: English, French, and Arabic.
*   **PWA Ready**: Can be installed on mobile devices.
*   **Share Route**: Share the live status of the bus with others.

## Tech Stack

*   **React 18**: UI Library.
*   **TypeScript**: Type safety.
*   **Tailwind CSS**: Utility-first styling.
*   **Leaflet**: Interactive Maps.
*   **Lucide React**: Vector Icons.

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```

## How to Use on Android

You can run this application on an Android phone in two ways:

### Method 1: Progressive Web App (PWA)
This is the easiest method. Since the app is built with web technologies, it can be "installed" directly from the browser.

1.  **Host the App**: Deploy the `build/` folder to a static host (Vercel, Netlify, or GitHub Pages).
2.  **Open in Chrome**: Navigate to the deployed URL on your Android phone's Chrome browser.
3.  **Install**:
    *   Tap the **three dots** menu in the top right corner.
    *   Select **"Add to Home screen"** or **"Install App"**.
4.  The app will appear in your app drawer and run fullscreen, just like a native app.

### Method 2: Native Wrapper (Capacitor)
To create a real `.apk` file that you can install:

1.  **Install Capacitor**:
    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/android
    npx cap init
    ```
2.  **Build the React App**:
    ```bash
    npm run build
    ```
3.  **Add Android Platform**:
    ```bash
    npx cap add android
    ```
4.  **Sync**:
    ```bash
    npx cap sync
    ```
5.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```
6.  Connect your Android phone via USB and click the **Run** button (Green Play icon) in Android Studio to install the app on your device.

## Note on Maps
The application uses Leaflet with OpenStreetMap tiles. Ensure your Android device has an active internet connection to load the map tiles.
