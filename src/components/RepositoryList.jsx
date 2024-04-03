import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flex: 1,
  },
})

const RepositoryList = () => {
  const { repositories } = useRepositories()
  
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        renderItem={({item}) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default RepositoryList