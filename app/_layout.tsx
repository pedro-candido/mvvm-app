import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />

            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    contentStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
        </SafeAreaProvider>
    );
}
