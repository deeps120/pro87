import  React from 'react';

import ExchangeScreen from '../screens/ExchangeScreen';

import SettingsScreen from '../screens/SettingsScreen';

export const AppStackNavigator = createStackNavigator({
    bookDonateList: {
        screen: SettingsScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    RecieverDetails:{
        screen:ExchangeScreen,
        navigationOptions:{
            headerShown:false
        }
    }
},
{initialRouteName:'bookDonateList'}
)