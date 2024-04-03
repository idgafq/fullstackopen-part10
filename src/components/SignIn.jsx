import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import useSignIn from '../hooks/useSignIn'
import * as yup from 'yup'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    padding: 10,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10
  }
})

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username too short')
    .required('Username required'),
  password: yup.
    string()
    .min(3, 'Password too short')
    .required('Passsword required')
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username
            ? { borderColor: 'red' }
            : { borderColor: 'gray' },
        ]}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password
            ? { borderColor: 'red' }
            : { borderColor: 'gray' },
        ]}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
            {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="textBar">Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
    } catch (e) {
      console.log(e)
    }
  }


  return <SignInForm onSubmit={onSubmit} />
}

export default SignIn