import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native"
import Text from "./Text"
import theme from "../theme"
import * as Linking from 'expo-linking'

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  headline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin:10,
    columnGap: 20,
  },
  headlineText: {
    flexDirection: 'column',
    rowGap: 5,
    flex: 1
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
  },
  detailsContainer: {
    flexDirection: 'row',
    columnGap: windowWidth * 0.1,
    alignSelf: 'center'
  },
  details: {
    flexDirection: 'column',
    rowGap: 5,
    alignItems: 'center',
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center'
  }
})

const formatToK = (count) => {
  return (count / 1000).toFixed(1) + 'k';
}

const RepositoryItem = ({ item, displayButton }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.headline}>
        <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}} />
        <View style={styles.headlineText}>
          <Text fontWeight="bold">
            {item.fullName}
          </Text>
          <Text color="textSecondary">
            {item.description}
          </Text>
          <View style={styles.languageContainer}>
            <Text color={"textBar"}>
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Text fontWeight="bold">
            {item.stargazersCount < 1000 ? item.stargazersCount : formatToK(item.stargazersCount)}
          </Text>
          <Text>
            Stars
          </Text>
        </View>
        <View style={styles.details}>
          <Text fontWeight="bold">
            {item.forksCount < 1000 ? item.forksCount : formatToK(item.forksCount)}
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
      {displayButton && <View style={styles.githubButton}>
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Text color="textBar" fontWeight="bold" style={styles.buttonText}>
            Open in Github
          </Text>
        </TouchableOpacity>
      </View>}
    </View>
  )
}

export default RepositoryItem