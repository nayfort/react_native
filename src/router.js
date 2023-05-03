import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import theme from './styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import Categories from './screens/Categories';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {LanguagesIcon, ShareIcon} from "./components/Icons";
import shareApp from './components/Share';
import HeaderTitle from "./components/HeaderTitle";


const Stack = createStackNavigator();

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
    duration: 0,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};


export default React.memo(() => (
  <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          <NavigationContainer>
                {/*Navigator param*/}
                <Stack.Navigator
                  screenOptions={{
                    ...MyTransition,
                    headerTintColor: 'white',
                    headerStyle: styles.navigation,
                    headerTitleAlign: 'center',
                  }}
                >
                  {/*First screen*/}
                  <Stack.Screen
                    name="Categories"
                    component={Categories}
                    options={({ navigation, route: { params } }) => ({
                      headerTitle: () => <HeaderTitle title="Useful Knots 3d" />,
                      headerRight: () => (
                        <View style={styles.headerRight}>
                          <LanguagesIcon
                            onPress={() =>
                              navigation.navigate('Languages', {
                                langCode: params.langCode,
                              })
                            }
                            style={{ width: 30 }}
                          />
                        </View>
                      ),
                      headerLeft: () => (
                        <View style={styles.headerLeft}>
                          <ShareIcon
                              onPress={() => shareApp(params.langCode)}
                            style={{ width: 30 }}
                          />
                        </View>
                      ),
                    })}
                  />
                  </Stack.Navigator>
                  </NavigationContainer>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  navigation: {
    backgroundColor: theme.navigationBackground,
  },
  headerLeft: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  headerRight: {
    marginRight: 15,
  },
});
