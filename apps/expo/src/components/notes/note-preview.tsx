import { Flex } from "../layout";
import { Text, TouchableOpacity } from "../atoms";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

type NotePreviewProps = {
  item: any;
  onPress: (noteId: string) => void;
};

export const NotePreview: React.FC<NotePreviewProps> = (props) => {
  const { item, onPress } = props;
  const maxChar = 100;
  const handlePress = useCallback(() => {
    onPress(item);
  }, [onPress]);

  const trucateText = (text: string, maxChar: number): string => {
    return text.slice(0, maxChar);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Flex
        backgroundColor={"warning"}
        margin={"xs"}
        flexGrow={1}
        height={200}
        p={"lg"}
        borderRadius={"md"}
      >
        <Text color={"black"} fontWeight={"bold"} textTransform={"capitalize"}>
          {item.title}
        </Text>
        <Text color={"$slate"}>{trucateText(item.content, maxChar)}</Text>
      </Flex>
    </TouchableOpacity>
  );
};
