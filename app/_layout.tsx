import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import "@/global.css";
import { tokenCache } from "@/utils/cache";
import { LogBox } from "react-native";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

// Clerk
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Convex
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const InitialLayout = () => {
  const [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // New state to handle splash screen loading logic
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync().then(() => setAppReady(true));
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    if (appReady && isLoaded) {
      const inAuthGroup = segments[0] === "(auth)";

      if (isSignedIn && !inAuthGroup) {
        router.replace("/(auth)/(tabs)/feed");
      } else if (!isSignedIn && inAuthGroup) {
        router.replace("/(public)");
      }
    }
  }, [appReady, isLoaded, isSignedIn, segments, router]);

  if (!appReady) {
    return null;
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey!}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <StatusBar style="dark" />
          <InitialLayout />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
