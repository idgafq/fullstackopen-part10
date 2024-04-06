import RepositoryItem from "./RepositoryItem"
import Text from "./Text"
import useRepository from "../hooks/useRepository"
import { useParams } from "react-router-native"
import { FlatList, StyleSheet, View } from "react-native"
import theme from "../theme"
import { format } from "date-fns"

const styles = StyleSheet.create({
  header: {
    marginBottom: 10
  },
  container: {
    backgroundColor: theme.colors.tertiary,
    flex: 1
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.textBar
  },
  ratingCircle: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 5,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  texts: {
    flex: 1
  },
  userAndDate: {
    marginVertical: 10
  },
  comment: {
    marginBottom: 10
  },
  separator: {
    height: 10,
  }
})

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.ratingCircle}>
        <Text fontWeight={"bold"}>
          {`${item.rating}`}
        </Text>
      </View>
      <View style={styles.texts}>
        <View style={styles.userAndDate}>
          <Text fontWeight={"bold"}>
            {`${item.user.username}`}
          </Text>
          <Text color="textSecondary">
            {format(new Date(item.createdAt), 'dd.MM.yyyy')}
          </Text>
        </View>
        <Text style={styles.comment}>
          {`${item.text}`}
        </Text>
      </View>
    </View>
  )
}

const RepositoryPage = () => {
  const { id } = useParams()
  const { repository, fetchMore } = useRepository({ first: 8, id: id })

  if (!repository) {
    return <Text>Repository not found</Text>
  }

  const onEndReach = () => {
    fetchMore()
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node)

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        onEndReached={onEndReach}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <RepositoryItem item={repository} displayButton />
          </View>
        )}
        ItemSeparatorComponent={<View style={styles.separator} />}
      />
    </View>
  )
}

export default RepositoryPage