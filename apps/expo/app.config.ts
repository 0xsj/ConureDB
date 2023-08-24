import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_c2F2ZWQtaW1wYWxhLTUxLmNsZXJrLmFjY291bnRzLmRldiQ";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "remarkable-mobile",
  slug: "remarkable-mobile",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  splash: {
    resizeMode: "contain",
    backgroundColor: "#2e026d",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "your.bundle.identifier",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#2e026d",
    },
  },
  extra: {
    eas: {
      projectId: "your-project-id",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
