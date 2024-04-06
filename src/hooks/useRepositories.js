import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (values) => {

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { ...values },
    fetchPolicy: 'cache-and-network'
  })

  if (error) {
    console.log(error)
    return null
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        values
      }
    })
  }

  const repositories = data?.repositories

  return { repositories, loading, fetchMore: handleFetchMore }
}

export default useRepositories