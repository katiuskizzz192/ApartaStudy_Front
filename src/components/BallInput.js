import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {normalizeBall} from '../utils/bingo';

export const BallInput = ({onSubmit}) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    const normalized = normalizeBall(value);
    if (!normalized) {
      Alert.alert('Formato inválido', 'Usa letra y número. Ej: B2, N33.');
      return;
    }
    onSubmit(normalized);
    setValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ingresa balota (B2, N33...)"
        value={value}
        onChangeText={setValue}
        style={styles.input}
        autoCapitalize="characters"
      />
      <Button title="Marcar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
});
