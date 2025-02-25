import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function QRCodeScreen({ route }) {
  const { url } = route.params;
  const { payment } = useSelector((state) => state.payment);
  const navigation = useNavigation();

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
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>Scan the QR Code to Pay</Text>
      <QRCode value={url} size={200} />
    </View>
  );
}
