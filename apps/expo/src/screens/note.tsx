import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Pressable, Screen, Text, TextInput } from "../components";
import { RootStackParamList } from "../navigation/navigation";
import { useAsyncStorage } from "../hooks/use-async-store";
import { useState } from "react";

type NoteScreenProps = NativeStackScreenProps<RootStackParamList, "note"> & {
  children?: React.ReactNode;
};

export function NoteScreen({ navigation }: NoteScreenProps) {
  const [note, setNote] = useState("");
  const [data, setData] = useAsyncStorage({ key: "note", initialValue: "" });

  const handleSave = () => {
    // setData(note);
    console.log("111");
  };

  return (
    <Screen>
      <Flex grow centered>
        <TextInput
          color={"$foreground"}
          placeholder="enter note"
          placeholderColor={"grey"}
          ml={"sm"}
          value={note}
          onChangeText={(text) => setNote(text)}
          // onBlur={handleSearchInputBlur}
          // onFocus={handleSearchInputFocus}
          // ref={refSearchInput}
          fontSize={16}
        />
        <Pressable onPress={handleSave}>
          <Text color={"white"}>Save</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("home")}>
          <Text color={"white"}>note </Text>
        </Pressable>
      </Flex>
    </Screen>
  );
}
