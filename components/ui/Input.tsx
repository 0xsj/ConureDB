import * as React from "react";
import { TextInput, Text, View } from "react-native";

export interface IInputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  text?: string;
  errors?: string | any;
  isFocused?: boolean;
}

export const Input = ({ label, text, errors, onBlur, ...props }: IInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleBlur = (event: any) => {
    setIsFocused(false);
    onBlur && onBlur(event);
  };

  return (
    <View>
      {label && <Text style={{ fontSize: 12, color: "#333", marginBottom: 6 }}>{label}</Text>}
      <TextInput
        style={[
          {
            flexDirection: "row",
            height: 40,
            width: "100%",
            alignItems: "center",
            borderRadius: 8,
            borderColor: "#ccc",
            borderWidth: 1,
            paddingHorizontal: 12,
            fontSize: 14,
          },
          isFocused && { borderColor: "#007AFF" },
          errors && { borderColor: "#FF3B30" },
        ]}
        placeholderTextColor={"#888"}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        {...props}
      />
      {text && <Text style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{text}</Text>}
      {errors && <Text style={{ fontSize: 14, color: "#FF3B30", marginTop: 6 }}>{errors}</Text>}
    </View>
  );
};
