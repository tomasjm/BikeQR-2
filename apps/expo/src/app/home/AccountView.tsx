import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '~/components/Button'
import { useRouter } from 'expo-router'
import { api, setToken } from "~/utils/api";

export default function AccountView() {
  const [startLogout, setStartLogout] = useState<boolean>(false)
  const logout = api.auth.logout.useMutation()
  const router = useRouter()
  useEffect(() => {
    if (startLogout && (logout.isSuccess || logout.isError)) {
      setToken("")
      console.log("logout")
      router.replace("auth/UserLogin")
    }
  }, [logout.isSuccess, logout.isError, startLogout])
  return (
    <View>
      <Text>AccountView</Text>
      {
        (logout.isLoading) && <ActivityIndicator />
      }
      <Button text="Logout" onPress={() => {
        logout.mutate()
        setStartLogout(true)
      }} />
    </View>
  )
}
