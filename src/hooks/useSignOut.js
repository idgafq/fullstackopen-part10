import { useApolloClient } from "@apollo/client"
import useAuthStorage from "./useAuthStorage"

const useSigOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return [signOut]
}

export default useSigOut