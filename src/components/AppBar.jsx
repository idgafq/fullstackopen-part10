import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import { Link } from 'react-router-native'
import theme from '../theme'
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import SignOut from './SignOut'

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
  const { data } = useQuery(ME, {
    onError: (e) => console.log(e)
  })

  const user = data?.me ?? null

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <Link to='/'>
          <AppBarTab text={'Repositories'} />
        </Link>
        {user && 
          <Link to='/review'>
            <AppBarTab text={'Create a review'} />
          </Link>
        }
        {user && 
          <Link to='/myreviews'>
            <AppBarTab text={'My Reviews'} />
          </Link>
        }
        { user && <SignOut /> }
        {!user &&
          <Link to='/signin'>
            <AppBarTab text={'Sign in'} />
          </Link>
        }
        {!user &&
          <Link to='/signup'>
            <AppBarTab text={'Sign up'} />
          </Link>
        }
      </ScrollView>
    </View>
  )
}

export default AppBar