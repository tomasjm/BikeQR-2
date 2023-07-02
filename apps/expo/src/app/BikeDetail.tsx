
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import QRCode from "react-native-qrcode-svg"



const BikeDetail = () => {
  const router = useRouter()
  const data = useLocalSearchParams()
  const [qr, setQr] = useState<string>()

  useEffect(() => {
    async function getQr(code: string) {
      try {
        const qr = await AsyncStorage.getItem(`@${code}`)
        if (qr) {
          setQr(qr)
        }
      } catch {
        alert("error")
      }
    }
    if (data.code) {
      getQr(data.code as string)
    }
  }, [])
  console.log(data)
  return (
    <View className="items-center my-5">
      <Text>Bicicleta: {data.title}</Text>
      <Text>Código: {data.code}</Text>
      <View className="my-10">
        {
          (qr) && <QRCode size={300} value={qr} />
        }
      </View>
    </View>
  )
}
export default BikeDetail
