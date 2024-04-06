import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import useCreateReview from '../hooks/useCreateReview'
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository ownder name is required'),
  repositoryName: yup
    .string()
    .required('Repository name required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required')
})

const CreateReviewContainer = ({ onSubmit }) => {
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
          formik.touched.ownerName && formik.errors.ownerName
            ? { borderColor: 'red' }
            : { borderColor: 'gray' },
        ]}
        placeholder='Rpository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName
            ? { borderColor: 'red' }
            : { borderColor: 'gray' },
        ]}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating
            ? { borderColor: 'red' }
            : { borderColor: 'gray' },
        ]}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.text && formik.errors.text
            ? { borderColor: 'red' }
            : { borderColor: 'gray' },
        ]}
        placeholder='Review'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline={true}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.error}>{formik.errors.text}</Text>
      )}
      
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="textBar">Create a review</Text>
      </Pressable>
    </View>
  )
}

const CreateReview = ({ refetch }) => {
  const [createReview] = useCreateReview()

  const onSubmit = async (values) => {
    try {
      await createReview({ ...values })
      await refetch()
    } catch (e) {
      console.log(e)
    }
  }


  return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReview