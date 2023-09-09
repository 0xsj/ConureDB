import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { Container, Flex } from "../layout";
import { RefObject, createRef } from "react";
import { Keyboard } from "react-native";
import { BackButton, IconButton } from "../button";

export const Editor = () => {
  const _editor: RefObject<QuillEditor> = createRef();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <Container>
      <IconButton name="" />
      <Flex flex={1}>
        <IconButton name="caret" onPress={() => _editor.current?.blur()} />

        <QuillEditor onFocus={() => console.log("111")} ref={_editor} />
      </Flex>
      <Flex position={"absolute"} top={400}>
        <Flex flexDirection={"row"}>
          <QuillToolbar editor={_editor} options="full" theme="light" />
        </Flex>
      </Flex>
    </Container>
  );
};
