import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LETTERS} from '../utils/bingo';

const Cell = ({value, marked, isFree}) => (
  <View style={[styles.cell, marked && styles.cellMarked, isFree && styles.freeCell]}>
    <Text style={[styles.cellText, marked && styles.cellTextMarked]}>{isFree ? 'FREE' : value}</Text>
  </View>
);

export const BingoCard = ({card}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Cartón #{card.number}</Text>
        <Text style={styles.id}>#{card.number}</Text>
      </View>
      <View style={styles.lettersRow}>
        {LETTERS.map(letter => (
          <Text key={letter} style={styles.letter}>
            {letter}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {card.cells.map((cell, idx) => (
          <Cell key={idx} {...cell} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfbf7',
    borderColor: '#111',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  id: {
    fontSize: 22,
    fontWeight: '800',
  },
  lettersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  letter: {
    fontSize: 20,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '20%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellMarked: {
    backgroundColor: '#b1e3b3',
  },
  cellText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cellTextMarked: {
    textDecorationLine: 'line-through',
  },
  freeCell: {
    backgroundColor: '#f7e8d3',
  },
});
