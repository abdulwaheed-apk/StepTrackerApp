# StepTrackerApp

A modern, elegant, and minimalist step tracking application built with React Native and Expo.

## Features

- **Activity Tracking**: Automatically tracks your daily steps, calculating calories burned, distance (km), and active duration.
- **Background Tracking**: Efficiently counts steps even when the app is in the background (Android).
- **History & Insights**: 
  - Weekly Progress visualization.
  - Detailed Month View with daily breakdowns.
  - Streak tracking to keep you motivated.
- **Personalization**:
  - Light & Dark mode support with automatic system detection.
  - Customizable profile (Name, Weight) and Daily Step Goals.
- **Inspiration**: Hourly refreshing fitness quotes to keep you moving.

## Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Navigation**: React Navigation (Stack)
- **State Management**: React Context API
- **Styling**: `expo-linear-gradient`, `expo-blur` (Glassmorphism), `lucide-react-native` (Icons)
- **Fonts**: `@expo-google-fonts/lexend`
- **Storage**: `AsyncStorage`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdulwaheed-apk/StepTrackerApp.git
   cd StepTrackerApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npx expo start -c
   ```

## Building for Production

To build the APK for Android with background permission support:

```bash
eas build -p android --profile production
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
