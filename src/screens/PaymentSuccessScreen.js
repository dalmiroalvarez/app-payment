import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Payment Completed Successfully! ✅</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('CreatePayment')} />
    </View>
  );
}
