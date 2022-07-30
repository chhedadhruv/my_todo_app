import { View, Text, Button, StyleSheet, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
    onSkip={() => navigation.replace('Login')}
    onDone={() => navigation.navigate('Login')}
    pages={[
    {
      backgroundColor: '#a9d7cc',
      image: <Image source={require('../assets/1.png')} />,
      title: 'TO-DO LIST',
      subtitle: '“Rename your “To-Do” list to your “Opportunities” list. Each day is a treasure chest filled with limitless opportunities; take joy in checking many off your list.”',
    },
    {
      backgroundColor: '#d5f7e7',
      image: <Image source={require('../assets/2.png')} />,
      title: 'TO-DO LIST WILL ALWAYS BE WITH YOU',
      subtitle: 'YOU CAN ALWAYS VIEW, CREATE OR DELETE A TO-DO ITEM FROM ANY DEVICE FROM ANYWHERE!!!',
    },
    ]}
    />
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});