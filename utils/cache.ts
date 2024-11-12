// import * as SecureStore from "expo-secure-store";
// import { Platform } from "react-native";
// import { TokenCache } from "@clerk/clerk-expo/dist/cache";

// const createTokenCache = (): TokenCache => {
//   return {
//     getToken: async (key: string) => {
//       try {
//         const item = await SecureStore.getItemAsync(key);
//         if (item) {
//           console.log(`${key} was used 🔐 \n`);
//         } else {
//           console.log("No values stored under key: " + key);
//         }
//         return item;
//       } catch (error) {
//         console.error("secure store get item error: ", error);
//         await SecureStore.deleteItemAsync(key);
//         return null;
//       }
//     },
//     saveToken: (key: string, token: string) => {
//       return SecureStore.setItemAsync(key, token);
//     },
//   };
// };

// // SecureStore is not supported on the web
// // https://github.com/expo/expo/issues/7744#issuecomment-611093485
// export const tokenCache =
//   Platform.OS !== "web" ? createTokenCache() : undefined;

import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: async (key: string, value: string) => {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
};

export const tokenCache = Platform.OS === "web" ? createTokenCache() : undefined;