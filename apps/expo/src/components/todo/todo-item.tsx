import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, TouchableOpacity } from "../atoms";
import { Flex } from "../layout";

interface TodoItemProps {
  item: any;
}

export const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { item } = props;
  console.log(item.title);
  const navigate = useNavigation();
  return (
    <TouchableOpacity onPress={() => console.log("111")}>
      <Flex
        grow
        centered
        backgroundColor={"$teal"}
        p={"10"}
        m={"xxs"}
        minHeight={200}
      >
        <Text color={"black"}>{item.title}</Text>
        <Text color={"grey"}>{item.content}</Text>
      </Flex>
    </TouchableOpacity>
  );
};
