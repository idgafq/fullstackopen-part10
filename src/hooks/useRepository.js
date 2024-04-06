import { useQuery } from "@apollo/client"
import { GET_REPOSITORY } from "../graphql/queries"

const useRepository = (values) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { ...values },
    fetchPolicy: 'cache-and-network'
  })

  if (error) {
    console.log(error)
    return null
  }

  const handleAFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...values
      }
    })
  }

  const repository = data?.repository

  return { repository, loading, fetchMore: handleAFetchMore }
}

export default useRepository