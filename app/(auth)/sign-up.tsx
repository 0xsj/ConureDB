import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSupabase } from "@/context/useSupabase"; // Adjust the path
import { Button } from "@/components/ui/Button"; // Adjust the path
import { Input } from "@/components/ui/Input"; // Adjust the path
import { Alert } from "@/components/ui/Alert"; // Adjust the path

const FormSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Please enter at least 8 characters.")
      .max(64, "Please enter fewer than 64 characters.")
      .regex(
        /^(?=.*[a-z])/,
        "Your password must have at least one lowercase letter."
      )
      .regex(
        /^(?=.*[A-Z])/,
        "Your password must have at least one uppercase letter."
      )
      .regex(/^(?=.*[0-9])/, "Your password must have at least one number.")
      .regex(
        /^(?=.*[!@#$%^&*])/,
        "Your password must have at least one special character."
      ),
    confirmPassword: z.string().min(8, "Please enter at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const { signUp } = useSupabase();
  const router = useRouter();
  const alertRef = React.useRef<any>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await signUp(data.email, data.password);
      router.push({
        pathname: "/verify",
        params: { email: data.email },
      });
    } catch (error: Error | any) {
      alertRef.current?.showAlert({
        variant: "destructive",
        title: "Error",
        message: error.message,
      });
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F0F0F0", // Replace with your color
        padding: 16,
      }}
    >
      <Alert ref={alertRef} />
      <Text
        style={{
          fontSize: 24,
          color: "#333",
          marginBottom: 20,
        }}
      >
        Welcome
      </Text>
      <View style={{ width
