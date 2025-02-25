import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Platform, 
  StatusBar, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback,
  Modal
} from 'react-native';
import CurrencySelector from '../components/CurrencySelector';

export default function PaymentConfirmationScreen({ navigation, route }) {

  const { amount: initialAmount, currency: initialCurrency, concept: initialConcept } = route.params || { 
    amount: '0.00', 
    currency: { code: 'USD', symbol: '$', name: 'Dólar Estadounidense', flag: require('../../assets/images/USA-FLAG.png') }, 
    concept: '' 
  };

  const [amount, setAmount] = useState(initialAmount);
  const [formattedAmount, setFormattedAmount] = useState(initialAmount);
  const [concept, setConcept] = useState(initialConcept || '');
  const [isFocused, setIsFocused] = useState(false);
  const [currency, setCurrency] = useState(initialCurrency);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);

  const symbolPosition = currency.code === 'EUR' || currency.code === 'GBP' ? 'right' : 'left';

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

  const handleCurrencySelect = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setShowCurrencySelector(false);
  };

  const isFormComplete = formattedAmount !== '0.00' && concept.trim() !== '';

  const buttonStyle = {
    ...styles.button,
    backgroundColor: isFormComplete ? '#035AC5' : '#EAF3FF',
  };

  const buttonTextStyle = {
    ...styles.buttonText,
    color: isFormComplete ? '#FFFFFF' : '#71B0FD',
  };

  const handleContinue = () => {
    if (isFormComplete) {
      navigation.navigate('SharePayment', {
        amount: formattedAmount,
        currency: currency,
        concept: concept
      });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Importe a pagar</Text>
            {/* Currency Selector en el header */}
            <TouchableOpacity 
              style={styles.currencySelector}
              onPress={() => setShowCurrencySelector(true)}
            >
              <Text style={styles.currencySelectorText}>{currency.code}</Text>
              <Text style={styles.currencySelectorSymbol}>{currency.symbol}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.amountContainer}>
            <View style={styles.amountInputWrapper}>
              {symbolPosition === 'left' && (
                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
              )}
              <TextInput
                style={[styles.amountInput, { color: '#035AC5' }]}
                value={formattedAmount === '0.00' ? '' : formattedAmount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#C0CCDA"
              />
              {symbolPosition === 'right' && (
                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
              )}
            </View>
          </View>
          <View style={styles.conceptContainer}>
            <Text style={styles.label}>Concepto</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  isFocused && { borderColor: '#035AC5', borderWidth: 1 }
                ]}
                placeholder="Añade descripción del pago"
                value={concept}
                onChangeText={setConcept}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={140}
              />
              <Text style={styles.charCounter}>{concept.length}/140 caracteres</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={buttonStyle} 
              onPress={handleContinue}
              disabled={!isFormComplete}
            >
              <Text style={buttonTextStyle}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={showCurrencySelector}
        animationType="slide"
        transparent={false}
      >
        <CurrencySelector
          onClose={() => setShowCurrencySelector(false)}
          onSelect={handleCurrencySelect}
          selectedCurrency={currency}
        />
      </Modal>
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
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF3FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  currencySelectorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#035AC5',
    marginRight: 5,
  },
  currencySelectorSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#035AC5',
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
    color: '#035AC5',
    marginLeft: 5,
    marginRight: 5,
  },
  amountInput: {
    fontSize: 60,
    fontWeight: 'bold',
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
  charCounter: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#647184',
    fontSize: 12,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};