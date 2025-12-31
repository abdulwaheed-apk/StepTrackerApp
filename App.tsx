import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

import { ThemeProvider } from './src/context/ThemeContext';
import { StepTrackerProvider } from './src/context/StepTrackerContext';

import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_600SemiBold, Lexend_700Bold, Lexend_800ExtraBold } from '@expo-google-fonts/lexend';

const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        Lexend_400Regular,
        Lexend_500Medium,
        Lexend_600SemiBold,
        Lexend_700Bold,
        Lexend_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <StepTrackerProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                                gestureEnabled: true,
                            }}
                        >
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Details" component={DetailsScreen} />
                            <Stack.Screen name="Settings" component={SettingsScreen} options={{ presentation: 'modal' }} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </StepTrackerProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
