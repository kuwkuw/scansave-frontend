# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# ScanSave - Supermarket Price Aggregator 🛒

A React Native mobile app that helps users find the best deals across different supermarkets and optimize their shopping trips.

## Features

- 🔍 Search and compare prices across multiple stores
- 📝 Create and manage shopping lists
- 🏷️ Browse current deals and promotions
- 📊 Optimize shopping trips for the lowest total cost
- 🗺️ View store locations and get directions
- 👤 Personalized user profiles and preferences

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npx expo start
```

## Running the App

You can run the app on:
- iOS Simulator
- Android Emulator
- Physical device using Expo Go
- Web browser (development only)

### iOS Setup
1. Install Xcode from the Mac App Store
2. Install iOS Simulator: `Xcode > Preferences > Components`
3. Press `i` in the terminal after starting the development server

### Android Setup
1. Install Android Studio
2. Create an Android Virtual Device (AVD)
3. Press `a` in the terminal after starting the development server

### Physical Device
1. Install Expo Go on your device
2. Scan the QR code from the terminal
3. The app will load on your device

## Project Structure

```
app/
  (tabs)/              # Tab-based navigation screens
    home.tsx           # Main dashboard
    search.tsx         # Product search and comparison
    list.tsx          # Shopping list management
    offers.tsx        # Deals and promotions
    profile.tsx       # User profile and settings
components/           # Reusable UI components
constants/           # App-wide constants
hooks/              # Custom React hooks
assets/             # Images, fonts, and other static files
```

## Technology Stack

- **Framework:** React Native with Expo
- **Navigation:** Expo Router (file-based)
- **UI Components:** Custom themed components
- **Icons:** Expo Vector Icons
- **Maps:** react-native-maps
- **Location:** expo-location

## Development Guidelines

- Use TypeScript for all new files
- Follow the existing component structure
- Maintain consistent styling patterns
- Include accessibility labels
- Test on both iOS and Android

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test on both platforms
4. Submit a pull request

## Learn More

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
