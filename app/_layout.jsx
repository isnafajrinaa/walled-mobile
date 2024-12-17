import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false, title: "" }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="tnc" options={{ presentation: "card", title: "Terms & Conditions" }}
            />
        </Stack>
    );
}