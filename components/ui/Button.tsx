import * as React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

export type ButtonVariantTypes =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export interface IButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  children?: React.ReactNode;
  variant?: ButtonVariantTypes;
  size?: "default" | "sm" | "lg";
  label?: string;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "default",
  size = "default",
  label = "Button",
  isLoading = false,
  ...props
}: IButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          // Add other relevant styles here
        },
        variant === "default" && {
          backgroundColor: "#007AFF", // Replace with your color
        },
        variant === "destructive" && {
          backgroundColor: "#FF3B30", // Replace with your color
        },
        variant === "outline" && {
          borderWidth: 1,
          borderColor: "gray", // Replace with your color
        },
        variant === "secondary" && {
          backgroundColor: "#5856D6", // Replace with your color
        },
        variant === "ghost" &&
          {
            // Add ghost button styles here
          },
        variant === "link" &&
          {
            // Add link button styles here
          },
        size === "default" && {
          height: 40,
          paddingHorizontal: 16,
          paddingVertical: 8,
        },
        size === "sm" && {
          height: 36,
          paddingHorizontal: 12,
          borderRadius: 6,
        },
        size === "lg" && {
          height: 44,
          paddingHorizontal: 32,
        },
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} />
      ) : (
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: "bold",
            },
            variant === "default" && {
              color: "white",
            },
            variant === "destructive" && {
              color: "white",
            },
            variant === "secondary" && {
              color: "white",
            },
            variant === "outline" && {
              color: "black", // Replace with your color
            },
            variant === "ghost" &&
              {
                // Add ghost button text styles here
              },
            variant === "link" &&
              {
                // Add link button text styles here
              },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
