import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import { Link } from 'react-router-native'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
  },
  scroll: {
    columnGap: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  }
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <Link to="/">
          <AppBarTab text={"Repositories"} />
        </Link>
        <Link to="/signin">
          <AppBarTab text={"Sign in"} />
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar