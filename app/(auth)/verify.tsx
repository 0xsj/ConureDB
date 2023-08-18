import React, { useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSupabase } from "@/context/useSupabase"; // Adjust the path
import { Button } from "@/components/ui/Button"; // Adjust the path
import { Input } from "@/components/ui/Input"; // Adjust the path
import { Alert } from "@/components/ui/Alert"; // Adjust the path

const FormSchema = z.object({
  token: z.string(),
});

export default function Verify() {
  const { verifyOtp } = useSupabase();
  const { email } = useLocalSearchParams();
  const alertRef = useRef<any>(null);

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
      await verifyOtp(email as string, data.token, "signup");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    alertRef.current?.showAlert({
      variant: "default",
      title: "Verification Required",
      message: "Check your email for a 6-digit OTP.",
    });
  }, []);

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
        Verification
      </Text>
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Controller
          control={control}
          name="token"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="6 digit code"
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                trigger("token");
                onBlur();
              }}
              errors={errors.token?.message}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              returnKeyType="done"
            />
          )}
        />
      </View>
      <View style={{ width: "100%", position: "absolute", bottom: 50 }}>
        <Button label="Verify" onPress={handleSubmit(onSubmit)} isLoading={isSubmitting} />
      </View>
    </SafeAreaView>
  );
}
