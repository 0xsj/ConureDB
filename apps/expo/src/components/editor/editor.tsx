import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { Container, Flex } from "../layout";
import { RefObject, createRef } from "react";
import { Keyboard } from "react-native";
import { BackButton, IconButton } from "../button";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme";
import { StyleSheet } from "react-native";

export const Editor = () => {
  const _editor: RefObject<QuillEditor> = createRef();
  const theme = useTheme<Theme>();
  const editorStyle = {
    editor: {
      flex: 1,
      padding: 0,
    },
  };
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ header: 1 }],
    [{ align: [] }],
  ];
  const toolbarStyles = {
    toolbar: {
      provider: (provided: any) => ({
        ...provided,
        borderTopWidth: 2,
      }),
      root: (provided: any) => ({
        ...provided,
        backgroundColor: theme.colors.$slate,
        borderRadius: theme.borderRadii.rounded,
        margin: 0,
        // padding: 30,
      }),
    },
  };

  return (
    <Container>
      <IconButton name="" />
      <Flex flex={1}>
        <IconButton name="user" onPress={() => _editor.current?.blur()} />

        <QuillEditor
          style={{
            backgroundColor: "",
            borderColor: "red",
            marginHorizontal: 30,
          }}
          theme={{
            background: theme.colors.$background,
            color: theme.colors.$foreground,
            placeholder: "hi",
          }}
          onFocus={() => console.log("111")}
          ref={_editor}
        />
      </Flex>
      <Flex
        position={"absolute"}
        top={400}
        backgroundColor={"warning"}
        flex={1}
      >
        <QuillToolbar
          styles={toolbarStyles}
          editor={_editor}
          options={toolbarOptions}
          theme="dark"
        />
      </Flex>
    </Container>
  );
};

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    // backgroundColor: "#eaeaea",
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: "red",
  },
  textbox: {
    height: 40,
    paddingHorizontal: 20,
  },
  editor: {
    flex: 1,
    padding: 0,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    // backgroundColor: "#ddd",
    padding: 10,
    margin: 3,
  },
});
