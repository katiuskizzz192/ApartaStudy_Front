import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Button, Switch, Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
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

export const EditCardScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {cardId} = route.params;
  const {cards, updateCard, resetCard, removeCard} = useBingo();
  const card = useMemo(() => cards.find(c => c.id === cardId), [cards, cardId]);
  const [number, setNumber] = useState(card?.number?.toString() ?? '');
  const [cells, setCells] = useState(card?.cells ?? []);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Cartón no encontrado.</Text>
      </View>
    );
  }

  const updateCell = (idx, field, value) => {
    setCells(prev =>
      prev.map((cell, i) =>
        i === idx
          ? {
              ...cell,
              [field]: value,
              marked: field === 'isFree' ? value || cell.marked : cell.marked,
            }
          : cell,
      ),
    );
  };

  const handleSave = () => {
    const updated = {
      ...card,
      number: parseInt(number || '0', 10),
      cells: cells.map((cell, idx) => ({
        ...cell,
        value: cell.value ? parseInt(cell.value, 10) : null,
        isFree: cell.isFree || idx === 12,
        marked: cell.isFree || idx === 12 ? true : cell.marked,
      })),
    };
    updateCard(updated);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Cartón #{card.number}</Text>
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
      <View style={styles.actions}>
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Resetear" onPress={() => resetCard(card.id)} />
        <Button
          title="Eliminar"
          color="#b00020"
          onPress={() => {
            removeCard(card.id);
            navigation.navigate('Home');
          }}
        />
      </View>
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
  actions: {
    gap: 8,
  },
});
