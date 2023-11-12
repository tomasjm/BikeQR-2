import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BikeListTitles } from "~/utils/Titles";
import LoadingView from "~/components/LoadingView";

const BikeDetail = () => {
  const data = useLocalSearchParams();
  const [qr, setQr] = useState<string>();

  useEffect(() => {
    async function getQr(code: string) {
      try {
        const qr = await AsyncStorage.getItem(`@${code}`);
        if (qr) {
          setQr(qr);
        }
      } catch {
        alert("error");
      }
    }
    if (data.code) {
      getQr(data.code as string);
    }
  }, [data.code]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {data ? (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <View style={{ flex: 1, alignItems: "center", paddingBottom: 50 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 20,
                textDecorationLine: "underline",
              }}
            >
              Detalle de la Bicicleta:{" "}
            </Text>
            {BikeListTitles.map((item) => (
              <View
                key={item.key}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBottom: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item.name}:
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {item.key === "createdAt" || item.key === "updatedAt"
                    ? new Date(data[item.key] as string).toLocaleString(
                        "es-CL",
                        {
                          timeZone: "America/Santiago",
                        },
                      )
                    : data[item.key]}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 20,
                textDecorationLine: "underline",
              }}
            >
              Código de retiro:
            </Text>
            <View className="border p-3">
              {qr ? (
                <QRCode size={350} logoSize={60} value={qr} />
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                    width: 350,
                    height: 350,
                  }}
                >
                  No se ha generado el código de retiro
                </Text>
              )}
            </View>
          </View>
        </View>
      ) : (
        <LoadingView />
      )}
    </View>
  );
};
export default BikeDetail;
