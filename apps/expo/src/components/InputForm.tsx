import React from "react";
import { Text, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";

type InputFormProps = {
  isDisabled: boolean;
  control: any;
  errors: any;
  labelTitle: string;
  name: string;
  value: string;
  hiddenText: boolean;
};
export default function InputForm({
  isDisabled,
  control,
  errors,
  labelTitle,
  name,
  value,
  hiddenText,
}: InputFormProps) {
  function isEditable(name: string): boolean {
    return name !== "role" && name !== "createdAt";
  }
  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text
              className="py-1"
              style={{
                fontSize: 16,
                lineHeight: 19,
                color: "#000000",
              }}
            >
              {labelTitle}
            </Text>
            <TextInput
              style={{
                width: "100%",
                borderWidth: 0.5,
                borderRadius: 5,
                padding: 10,
              }}
              editable={isEditable(name) && isDisabled}
              className="border-gray-300"
              onChangeText={onChange}
              value={
                typeof value === "string"
                  ? value
                  : new Date(value as string).toLocaleString("es-CL", {
                      timeZone: "America/Santiago",
                    })
              }
              secureTextEntry={hiddenText}
            />
          </View>
        )}
        defaultValue={value}
        name={name}
      />
      {errors[name] && (
        <Text
          style={{
            color: "#ff0000",
            fontSize: 14,
            textAlign: "right",
            paddingRight: 2,
          }}
        >
          Campo requerido
        </Text>
      )}
    </View>
  );
}
