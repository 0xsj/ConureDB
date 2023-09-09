import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Pressable, Screen, Text, TextInput } from "../components";
import { RootStackParamList } from "../navigation/navigation";
import { useAsyncStorage } from "../hooks/use-async-store";
import { useState } from "react";
import { Editor } from "../components/editor/editor";

type NoteScreenProps = NativeStackScreenProps<RootStackParamList, "note"> & {
  children?: React.ReactNode;
};

export function NoteScreen({ navigation }: NoteScreenProps) {
  const [note, setNote] = useState("");
  const [data, setData] = useAsyncStorage({ key: "note", initialValue: "" });

  return (
    <Screen>
      <Editor />
    </Screen>
  );
}
