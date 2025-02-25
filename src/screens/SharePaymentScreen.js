import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function SharePaymentScreen() {
  const navigation = useNavigation();
  const { payment } = useSelector((state) => state.payment);

  useEffect(() => {
    const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${payment?.id}`);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === 'completed') {
        navigation.navigate('PaymentSuccess');
      }
    };
    return () => socket.close();
  }, [payment]);

  return (
    <View>
      <Text>Share this payment link:</Text>
      <Text>{payment?.web_url}</Text>
      <Button title="Generate QR" onPress={() => navigation.navigate('QRCode', { url: payment?.web_url })} />
    </View>
  );
}