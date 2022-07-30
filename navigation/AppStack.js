import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
// import Detail from '../screens/Detail';

const Stack = createStackNavigator();

const AppStack = ({navigation}) => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Detail" component={Detail} /> */}
    </Stack.Navigator>
    );
}

export default AppStack;
