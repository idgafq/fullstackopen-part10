import { View, StyleSheet, Image, Dimensions } from "react-native"
import Text from "./Text"
import theme from "../theme"

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginBottom: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  headline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    marginHorizontal: 20,
    columnGap: 20,
    paddingRight: windowWidth * 0.1,
  },
  headlineText: {
    flexDirection: 'column',
    rowGap: 5,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
  },
  detailsContainer: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: windowWidth * 0.1,
    columnGap: windowWidth * 0.1,
  },
  details: {
    flexDirection: 'column',
    rowGap: 5,
    alignItems: 'center',
  }
})

const formatToK = (count) => {
  return (count / 1000).toFixed(1) + 'k';
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}} />
        <View style={styles.headlineText}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.languageContainer}>
            <Text color={"textBar"}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text fontWeight="bold">
            {formatToK(item.stargazersCount)}
          </Text>
          <Text>
            Stars
          </Text>
        </View>
        <View style={styles.details}>
          <Text fontWeight="bold">
            {formatToK(item.forksCount)}
          </Text>
          <Text>
            Forks
          </Text>
        </View>
        <View style={styles.details}>
          <Text fontWeight="bold">
            {item.reviewCount.toString()}
          </Text>
          <Text>
            Reviews
          </Text>
        </View>
        <View style={styles.details}>
          <Text fontWeight="bold">
            {item.ratingAverage.toString()}
          </Text>
          <Text>
            Rating
          </Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem