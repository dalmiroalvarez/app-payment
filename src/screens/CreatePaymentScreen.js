import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Modal, Platform, 
  StatusBar, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback
} from 'react-native';
import CurrencySelector from '../components/CurrencySelector';

export default function CreatePaymentScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('0.00');
  const [currency, setCurrency] = useState({ code: 'USD', symbol: '$' });
  const [concept, setConcept] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleContinue = () => {
    // Navegar a la pantalla de confirmación de pago
    navigation.navigate('PaymentConfirmation', {
      amount: formattedAmount,
      currency: currency,
      concept: concept
    });
  };

  const formatAmount = (value) => {
    if (!value) return '0.00';

    let cleanValue = value.replace(/\./g, '');
    cleanValue = cleanValue.replace(/[^\d.]/g, '');
    
    const parts = cleanValue.split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? parts[1] : '';
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return decimalPart ? `${formattedInteger}.${decimalPart.slice(0, 9)}` : formattedInteger;
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    setFormattedAmount(formatAmount(value));
  };

  // Determina si el símbolo va a la izquierda o derecha según el código de moneda
  const symbolPosition = currency.code === 'EUR' || currency.code === 'GBP' ? 'right' : 'left';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Crear pago</Text>
            <TouchableOpacity 
              style={styles.currencySelector} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.currencyText}>{currency.code}</Text>
              <Text style={styles.arrowDown}>▼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.amountContainer}>
            <View style={styles.amountInputWrapper}>
              {/* Mostrar símbolo a la izquierda solo si no es EUR o GBP */}
              {symbolPosition === 'left' && (
                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
              )}
              
              <TextInput
                style={styles.amountInput}
                value={formattedAmount === '0.00' ? '' : formattedAmount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#C0CCDA"
              />
              
              {/* Mostrar símbolo a la derecha solo si es EUR o GBP */}
              {symbolPosition === 'right' && (
                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
              )}
            </View>
          </View>
          <View style={styles.conceptContainer}>
            <Text style={styles.label}>Concepto</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Añade descripción del pago"
                value={concept}
                onChangeText={setConcept}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={modalVisible} animationType="slide">
            <CurrencySelector 
              onClose={() => setModalVisible(false)}
              onSelect={(selectedCurrency) => {
                setCurrency(selectedCurrency);
                setModalVisible(false);
              }}
              selectedCurrency={currency}
            />
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#60617029',
    position: 'relative',
    width: '100%',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002859',
  },
  currencySelector: {
    position: 'absolute',
    right: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E8EAF0',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    color: '#002859',
    marginRight: 5,
  },
  arrowDown: {
    fontSize: 12,
    color: '#002859',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#60617029',
    marginVertical: 10,
    width: '100%',
  },
  amountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#C0CCDA',
    marginLeft: 5,
    marginRight: 5,
  },
  amountInput: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#C0CCDA',
    minWidth: 100,
    textAlign: 'center',
  },
  conceptContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  inputWrapper: {
    width: '90%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    color: '#647184',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#EAF3FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#71B0FD',
    fontSize: 16,
    fontWeight: 'bold',
  },
};