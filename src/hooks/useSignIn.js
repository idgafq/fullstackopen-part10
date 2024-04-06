import { SIGN_IN } from '../graphql/mutations'
import { useMutation, useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (e) => console.log(e)
  })
  const authStorage = useAuthStorage()
  const navigate = useNavigate()
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const  { data } = await mutate({ variables: { credentials: { username, password } } })
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
    navigate('/')
    return
  }

  return [signIn, result]
}

export default useSignIn