import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { Container, Flex } from "../layout";
import { RefObject, createRef } from "react";
import { BackButton, IconButton } from "../button";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Editor: React.FC = () => {
  const _editor: RefObject<QuillEditor> = createRef();
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme<Theme>();
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ header: 1 }],
    [{ align: [] }],
  ];
  const toolbarStyles = {
    toolbar: {
      provider: (provided: any) => ({
        ...provided,
        borderTopWidth: 0,
        margin: 0,
      }),
      root: (provided: any) => ({
        ...provided,
        backgroundColor: theme.colors.$slate,
        border: "none",
        margin: 0,
      }),
    },
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={safeAreaInsets.bottom} //
    >
      <Container>
        <Flex justifyContent={"space-around"} flexDirection={"row"}>
          <BackButton />
          <IconButton
            name="x-circle"
            color={"$slate"}
            onPress={() => _editor.current?.blur()}
          />
        </Flex>
        <Flex flex={1}>
          <QuillEditor
            style={{
              backgroundColor: "",
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
          bottom={20}
          overflow={"hidden"}
          borderRadius={"rounded"}
          margin={"xxs"}
        >
          <QuillToolbar
            styles={toolbarStyles}
            editor={_editor}
            options={"full"}
            theme="dark"
          />
        </Flex>
      </Container>
    </KeyboardAvoidingView>
  );
};
