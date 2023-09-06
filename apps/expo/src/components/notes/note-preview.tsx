import { Flex } from "../layout";
import { Text } from "../atoms";

type NotePreviewProps = {
  item: any;
};

export const NotePreview: React.FC<NotePreviewProps> = (props) => {
  const { item } = props;
  const maxChar = 100;

  const trucateText = (text: string, maxChar: number): string => {
    return text.slice(0, maxChar);
  };

  return (
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
  );
};
