import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { useSupabase } from "@/context/useSupabase";

export default function Index() {
  const { signOut } = useSupabase();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F0F0", // Replace with your color
      }}
    >
      <TouchableOpacity onPress={() => signOut()} style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#007AFF", // Replace with your color
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
