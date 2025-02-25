import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CreatePaymentScreen from './screens/CreatePaymentScreen';
import SharePaymentScreen from './screens/SharePaymentScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                  name="CreatePayment" 
                  component={CreatePaymentScreen} 
            />
            <Stack.Screen 
                  name="PaymentConfirmation" 
                  component={PaymentConfirmationScreen} 
            />
            <Stack.Screen 
                  name="SharePayment" 
                  component={SharePaymentScreen} 
            />
            <Stack.Screen 
                  name="QRCode" 
                  component={QRCodeScreen} 
            />
            <Stack.Screen 
                  name="PaymentSuccess" 
                  component={PaymentSuccessScreen} 
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
}