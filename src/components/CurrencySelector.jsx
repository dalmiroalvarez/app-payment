import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Image, 
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import {TickIcon} from '../utils/SVGLibrarie';

const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro', flag: require('../../assets/images/EUR-FLAG.png') },
  { code: 'USD', symbol: '$', name: 'Dólar Estadounidense', flag: require('../../assets/images/USA-FLAG.png') },
  { code: 'GBP', symbol: '£', name: 'Libra Esterlina', flag: require('../../assets/images/GBP-FLAG.png') },
];

export default function CurrencySelector({ onClose, onSelect, selectedCurrency }) {
  const [search, setSearch] = useState('');

  const filteredCurrencies = currencies.filter(currency => 
    currency.name.toLowerCase().includes(search.toLowerCase()) ||
    currency.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Selecciona una divisa</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#999"
          />
        </View>
        <FlatList 
          data={filteredCurrencies}
          keyExtractor={(item) => item.code}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.currencyItem} 
              onPress={() => onSelect(item)}
            >
              <Image source={item.flag} style={styles.flag} />
              <View style={styles.currencyInfo}>
                <Text style={styles.currencyName}>{item.name}</Text>
                <Text style={styles.currencyCode}>{item.code}</Text>
              </View>
                {selectedCurrency?.code === item.code && (
                    <TickIcon width={20} height={20} color="#71B0FD" style={styles.tickIcon} />
                )}
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
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
  backButton: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
  },
  backText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002859',
  },
  searchContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 15,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  flag: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  currencyInfo: {
    flexDirection: 'column',
    marginLeft: 15,
    flex: 1,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '500',
  },
  currencyCode: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  tickIcon: {
    position: 'absolute',
    right: 10,
  },
});
