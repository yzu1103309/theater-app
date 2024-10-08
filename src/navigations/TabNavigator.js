import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';
import Icon from '../components/shared/Icon';
import {colors, sizes} from '../constants/theme';
import {StyleSheet, Animated, Platform} from 'react-native';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import UserScreen from '../screens/UserScreen';
import RequestScreen from '../screens/RequestScreen';

const Tab = createBottomTabNavigator();

let tabs = [
  {
    name: 'Home',
    screen: HomeNavigator,
  },
  {
    name: 'Search',
    screen: SearchNavigator,
  },
  {
    name: 'Favorite',
    screen: FavoriteScreen,
  },
  {
    name: 'Send',
    screen: RequestScreen,
  },
  {
    name: 'User',
    screen: UserScreen,
  },
];

const TabNavigator = () => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;
  offsetAnimation.addListener(() => {});
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        {tabs.map(({name, screen}, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={{
                tabBarIcon: ({focused}) => {
                  return (
                    <Icon
                      icon={name}
                      size={30}
                      style={{
                        tintColor: focused ? colors.primary : colors.gray,
                      }}
                    />
                  );
                },
              }}
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (sizes.width / tabs.length),
                    useNativeDriver: true,
                  }).start();
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
      {Platform.OS !== 'android' && (
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: offsetAnimation,
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: 10,
    height: 2,
    left: sizes.width / tabs.length / 2 - 5,
    bottom: 30,
    backgroundColor: colors.primary,
    zIndex: 100,
  },
});

export default TabNavigator;
