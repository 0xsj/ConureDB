import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Pressable, Screen, Text, TextInput } from "../components";
import { RootStackParamList } from "../navigation/navigation";
import { useAsyncStorage } from "../hooks/use-async-store";
import { useState } from "react";
import { Editor } from "../components/editor/editor";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NoteScreenProps = NativeStackScreenProps<RootStackParamList, "note"> & {
  children?: React.ReactNode;
};

export function NoteScreen({ navigation }: NoteScreenProps) {
  const [note, setNote] = useState("");
  const [data, setData] = useAsyncStorage({ key: "note", initialValue: "" });

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={safeAreaInsets.bottom}
      >
        <Editor />
      </KeyboardAvoidingView>
    </Screen>
  );
}
