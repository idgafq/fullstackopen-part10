import useSigOut from '../hooks/useSignOut'
import AppBarTab from "./AppBarTab"
import { Pressable } from "react-native"

const SignOut = () => {
  const [signOut] = useSigOut()

  const onClick = async() => {
    try {
      await signOut()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Pressable onPress={onClick}>
      <AppBarTab text="Sign out" />
    </Pressable>
  )
}

export default SignOut