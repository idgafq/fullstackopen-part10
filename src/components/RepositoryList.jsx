import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Link } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'
import theme from '../theme'
import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.tertiary,
    flex: 1,
  },
  separator: {
    height: 10,
  }
})

export const RepositoryListContainer = ({ repositories, order, setOrder, keyword, setKeyword, fetchMore }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []
  
  const onEndReach = () => {
    fetchMore()
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        renderItem={({item}) => (
          <Link to={`/repository/${item.id}`}>
            <RepositoryItem item={item} />
          </Link>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={styles.separator} />}
        onEndReached={onEndReach}
        ListHeaderComponent={
          <View>
            <Searchbar
              placeholder='Search'
              onChangeText={setKeyword}
              value={keyword}
            />
            <Picker
              selectedValue={order}
              onValueChange={(itemValue) => setOrder(itemValue)}
            >
              <Picker.Item label="Latest repositories" value="latest"/>
              <Picker.Item label="Highest rated repositories" value="highestRated" />
              <Picker.Item label="Lowest rated repositories" value="lowestRated" />
            </Picker>
          </View>
        }
      />
    </View>
  )
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest')
  const [keyword, setKeyword] = useState('')
  const [searchKeyword] = useDebounce(keyword, 1000)

  const parseOrder = (order) => {
    switch (order) {
      case 'latest':
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC'}
      case 'highestRated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
      case 'lowestRated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
    }
  }

  const { repositories, fetchMore } = useRepositories({ first: 8, ...parseOrder(order), searchKeyword })

  return <RepositoryListContainer
    repositories={repositories}
    order={order}
    setOrder={setOrder}
    keyword={keyword}
    setKeyword={setKeyword}
    fetchMore={fetchMore}
  />
}

export default RepositoryList