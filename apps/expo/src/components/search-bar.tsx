import { TextInput } from "./atoms";
import { TextInput as RNTextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedBox } from "./layout/box";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useAtom } from "jotai";
import { searchInputHasFocusAtom, searchQueryAtom } from "../store";
import { useRef } from "react";
import { Theme } from "../theme";
import { useTheme } from "@shopify/restyle";
import { IconButton } from "./button";

type SearchBarProps = {
  navigation: any;
};

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { navigation } = props;
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [searchInputHasFocus, setSearchInputHasFocus] = useAtom(
    searchInputHasFocusAtom,
  );
  const theme = useTheme<Theme>();
  const refSearchInput = useRef<RNTextInput>(null);
  const handleSearchInputFocus = () => {
    setSearchInputHasFocus(true);
    console.log("1111");
  };
  const handleSearchInputBlur = () => {
    setSearchInputHasFocus(false);
    console.log(searchQuery);
  };
  const safeAreaInsets = useSafeAreaInsets();

  const safeAreaStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(searchInputHasFocus ? 1 : 0.8),
    }),
    [searchInputHasFocus],
  );

  const barStyle = useAnimatedStyle(
    () => ({
      marginHorizontal: withTiming(searchInputHasFocus ? 0 : theme.spacing.lg),
      borderRadius: withTiming(searchInputHasFocus ? 0 : theme.borderRadii.md, {
        duration: 600,
      }),
    }),
    [searchInputHasFocus],
  );

  return (
    <AnimatedBox style={safeAreaStyle}>
      <AnimatedBox
        bg={"$header"}
        top={-safeAreaInsets.top}
        mx={"sm"}
        borderRadius={"rounded"}
        px={"sm"}
        flexDirection={"row"}
      >
        <AnimatedBox>
          <IconButton name="menu" onPress={handleSearchInputBlur} />
        </AnimatedBox>
        <AnimatedBox flex={1} height={44}>
          <TextInput
            color={"$foreground"}
            placeholder="search text"
            placeholderColor={"grey"}
            ml={"sm"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onBlur={handleSearchInputBlur}
            onFocus={handleSearchInputFocus}
            ref={refSearchInput}
            fontSize={16}
            flex={1}
          />
        </AnimatedBox>
        <AnimatedBox flexDirection={"row"}>
          <IconButton name="more-vertical" />
          <IconButton onPress={() => navigation.navigate("note")} name="plus" />
        </AnimatedBox>
      </AnimatedBox>
    </AnimatedBox>
  );
};
