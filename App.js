import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './components/MainPage';
import InfoPage from './components/InfoPage';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import SetupIntroPage from './components/SetupIntroPage';
import GenderPage from './components/GenderPage';
import AgePicker from './components/AgePicker';
import WeightPage from './components/WeightPage';
import HeightPage from './components/HeightPage';
import GoalPage from './components/GoalPage';
import PhysicalActivity from './components/PhysicalActivity';
import HomePage from './components/HomePage';
import Workout from './components/Workout';
import ExerciseDesc from './components/ExerciseDesc';
import Profile from './components/Profile';
import Favourites from './components/Favourites';
import Food from './components/Food';
import FoodDesc from './components/FoodDesc';
import WarmUp from './components/WarmUp';
import Progress from './components/Progress';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={InfoPage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Sign" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Setup" component={SetupIntroPage} options={{ headerShown: false }} />
        <Stack.Screen name="Gender" component={GenderPage} options={{ headerShown: false }} />
        <Stack.Screen name="Age" component={AgePicker} options={{ headerShown: false }} />
        <Stack.Screen name="Weight" component={WeightPage} options={{ headerShown: false }} />
        <Stack.Screen name="Height" component={HeightPage} options={{ headerShown: false }} />
        <Stack.Screen name="Goal" component={GoalPage} options={{ headerShown: false }} />
        <Stack.Screen name="Physical" component={PhysicalActivity} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Workout" component={Workout} options={{ headerShown: false }} />
        <Stack.Screen name="ExerciseDesc" component={ExerciseDesc} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Favorites" component={Favourites} options={{ headerShown: false }} />
        <Stack.Screen name="Food" component={Food} options={{ headerShown: false }} />
        <Stack.Screen name="FoodDesc" component={FoodDesc} options={{ headerShown: false }} />
        <Stack.Screen name="Warmup" component={WarmUp} options={{ headerShown: false }} />
        <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


