import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            {/* Optionally configure static options outside the route.*/}
            {/* Yang meremove merah-merah di atas */}
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}