import { useLocalSearchParams, useRouter } from "expo-router"
import { ActivityIndicator, Text, View } from "react-native"
import Button from "~/components/Button"
import { api } from "~/utils/api"



const FinishTest = () => {
  const confirmFinish = api.storage.confirmFinishStorage.useMutation();
  const { token, code, description } = useLocalSearchParams();
  const router = useRouter()

  if (confirmFinish.isSuccess && !confirmFinish.data.error) {
    alert("se ha confirmado el retiro")
    router.back()
  }
  return (
    <View>
      <Text>
        Bicicleta
      </Text>
      <Text>Código: {code}</Text>
      <Text>Descripción: {description}</Text>
      {
        (confirmFinish.isLoading) ? <ActivityIndicator /> : <Button text="Confirmar retiro" onPress={() => {
          confirmFinish.mutate({ token: token as string })

        }} />
      }
    </View>
  )
}
export default FinishTest;
