import { StyleSheet, View } from 'react-native'

import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import RepositoryPage from './RepositoryPage'
import CreateReview from './CreateReview'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    onError: (e) => console.log(e)
  })

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path={`/repository/:id`} element={<RepositoryPage />} />
        <Route path="/review" element={<CreateReview refetch={refetch} />} />
        <Route path="/myreviews" element={<MyReviews data={data} refetch={refetch} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main