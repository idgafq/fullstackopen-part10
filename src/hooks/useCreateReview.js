import { CREATE_REVIEW }  from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

const useCreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW, {
    onError: (e) => {
      console.log(e.message)
    }
  })
  const navigate = useNavigate()

  const createReview = async ({ ownerName, rating, repositoryName, text}) => {
    const { data } = await mutate({ variables: { review: { ownerName, rating: parseInt(rating), repositoryName, text } } })
    const id = data?.createReview.repositoryId
    if (id) {
      navigate(`/repository/${id}`)
    }
  }

  return [createReview]
}

export default useCreateReview