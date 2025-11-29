import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Button, Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useBingo} from '../hooks/useBingo';

const CellInput = ({value, onChange, isFree, onToggleFree}) => (
  <View style={styles.cellWrapper}>
    <TextInput
      keyboardType="number-pad"
      value={value?.toString() ?? ''}
      onChangeText={onChange}
      placeholder="--"
      style={[styles.cellInput, isFree && styles.freeCell]}
    />
    <View style={styles.freeRow}>
      <Text style={styles.freeLabel}>FREE</Text>
      <Switch value={isFree} onValueChange={onToggleFree} />
    </View>
  </View>
);

export const CreateCardScreen = () => {
  const navigation = useNavigation();
  const {addCard} = useBingo();
  const [number, setNumber] = useState('1');
  const [cells, setCells] = useState(Array(25).fill({value: '', isFree: false, marked: false}));

  const updateCell = (idx, field, value) => {
    setCells(prev =>
      prev.map((cell, i) => (i === idx ? {...cell, [field]: value, marked: field === 'isFree' ? value : cell.marked} : cell)),
    );
  };

  const handleSave = () => {
    const parsedCells = cells.map((cell, idx) => {
      const isCenter = idx === 12;
      const val = cell.value ? parseInt(cell.value, 10) : null;
      const isFree = cell.isFree || isCenter;
      return {value: val, isFree, marked: isFree};
    });
    addCard(parseInt(number || '0', 10), parsedCells);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cartón</Text>
      <TextInput
        value={number}
        onChangeText={setNumber}
        placeholder="Número del cartón"
        keyboardType="number-pad"
        style={styles.cardNumber}
      />
      <View style={styles.grid}>
        {cells.map((cell, idx) => (
          <CellInput
            key={idx}
            value={cell.value}
            isFree={cell.isFree || idx === 12}
            onChange={text => updateCell(idx, 'value', text)}
            onToggleFree={val => updateCell(idx, 'isFree', val)}
          />
        ))}
      </View>
      <Button title="Guardar" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardNumber: {
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 8,
    padding: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cellWrapper: {
    width: '18%',
    alignItems: 'center',
  },
  cellInput: {
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 6,
    padding: 8,
    width: '100%',
    textAlign: 'center',
  },
  freeCell: {
    backgroundColor: '#f7e8d3',
  },
  freeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  freeLabel: {
    fontSize: 10,
    marginRight: 4,
  },
});
