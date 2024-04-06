import { SIGN_UP } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import useSignIn from './useSignIn'

const useSignUp = () => {
  const [mutate] = useMutation(SIGN_UP, {
    onError: (e) => console.log(e)
  })
  const [signIn] = useSignIn()

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { user: { username, password } } })
    if (data) {
      await signIn({ username, password })
    }
    return
  }

  return [signUp]
}

export default useSignUp