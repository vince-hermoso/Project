import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ProfileScreen from './ProfileScreen';
import RecipeDetailScreen from './RecipeDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Explore') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'About') iconName = focused ? 'information-circle' : 'information-circle-outline';
          else if (route.name === 'Contact') iconName = focused ? 'mail' : 'mail-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person-circle' : 'person-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00BFFF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { 
          backgroundColor: '#121212', 
          borderTopColor: '#FF69B4',
          paddingTop: 5,
        },
        headerStyle: { 
          backgroundColor: '#121212',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: '#00BFFF',
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 20,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Featured' }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: 'Discover' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
      <Tab.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetailScreen} 
          options={{ 
            title: 'Recipe Details',
            headerShown: true,
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#00BFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
