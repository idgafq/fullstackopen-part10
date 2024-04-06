import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import useSignUp from '../hooks/useSignUp'
import * as yup from 'yup'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
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
  passwordConfirmation: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username too short')
    .max(30, 'Username too long')
    .required('Username required'),
  password: yup
    .string()
    .min(5, 'Password too short')
    .max(50, 'Password too long')
    .required('Passsword required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation does not match')
    .required('Password confirmation required')
})

const SignUpContainer = ({ onSubmit }) => {
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

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
            ? { borderColor: 'red' }
            : { borderColor: 'gray' },
        ]}
        placeholder='Password confirmation'
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        secureTextEntry
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
      )}
      
      
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="textBar">Sign up</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signUp({ username, password })
    } catch (e) {
      console.log(e)
    }
  }


  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp