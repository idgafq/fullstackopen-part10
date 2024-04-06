import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'
import { Link } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteReview'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.tertiary,
    flex: 1,
  },
  separator: {
    height: 10,
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
  itemContainer: {
    flexDirection: 'column',
    backgroundColor: theme.colors.textBar
  },
  infoContainer: {
    flexDirection: 'row',
  },
  texts: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    margin: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center'
  },
  deleteButton: {
    flex: 1,
    margin: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center'
  },
  repoAndDate: {
    marginVertical: 10
  },
  comment: {
    marginBottom: 10
  },
})

const Review = ({ item, refetch }) => {
  const [deleteReview] = useDeleteReview()

  const handlePressDelete = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await deleteReview(item.id)
          refetch()
        }
      }
    ])
  }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.ratingCircle}>
          <Text fontWeight={"bold"}>
            {`${item.rating}`}
          </Text>
        </View>
        <View style={styles.texts}>
          <View style={styles.repoAndDate}>
            <Text fontWeight={"bold"}>
              {`${item.repository.fullName}`}
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
      <View style={styles.buttons}>
        <Link to={`/repository/${item.repositoryId}`} style={styles.button}>
          <Text color="textBar" fontWeight="bold">View Repository</Text>
        </Link>
        <Pressable onPress={handlePressDelete} style={styles.deleteButton}>
          <Text color="textBar" fontWeight="bold">Delete Review</Text>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = ({ data, refetch }) => {
  const reviews = data?.me?.reviews.edges.map((edge) => edge.node)

  if (!reviews) {
    return <Text text="No reviews found" />
  }

  const Separator = () => <View style={styles.separator} />

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Review item={item} refetch={refetch}/>}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={Separator}
      />
    </View>
  )
}

export default MyReviews