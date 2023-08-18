import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSupabase } from "@/context/useSupabase";
import { Button } from "@/components/ui/Button"; // Adjust the path
import { Input } from "@/components/ui/Input"; // Adjust the path
import { Alert } from "@/components/ui/Alert"; // Adjust the path
import { Error } from "@/types/error";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Please enter at least 8 characters.")
    .max(64, "Please enter fewer than 64 characters."),
});

export default function Login() {
  const { signInWithPassword } = useSupabase();
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
      await signInWithPassword(data.email, data.password);
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
        Login
      </Text>
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                trigger("email");
                onBlur();
              }}
              errors={errors.email?.message}
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                trigger("password");
                onBlur();
              }}
              errors={errors.password?.message}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry
            />
          )}
        />
      </View>
      <View style={{ width: "100%", position: "absolute", bottom: 50 }}>
        <Button label="Login" onPress={handleSubmit(onSubmit)} isLoading={isSubmitting} />
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text style={{ fontSize: 14, color: "#333", textAlign: "center" }}>
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
