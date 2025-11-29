import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {generateBingoBoard} from '../utils/bingo';

export const ReboleteoGrid = ({balls}) => {
  const board = generateBingoBoard(balls);
  return (
    <View style={styles.container}>
      {board.map(column => (
        <View key={column.letter} style={styles.column}>
          <Text style={styles.columnHeader}>{column.letter}</Text>
          {column.numbers.map(item => (
            <View
              key={item.label}
              style={[styles.cell, item.drawn && styles.cellDrawn]}>
              <Text style={styles.cellText}>{item.label.slice(1)}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
  },
  column: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },
  columnHeader: {
    textAlign: 'center',
    fontWeight: '800',
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#111',
  },
  cell: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    alignItems: 'center',
  },
  cellDrawn: {
    backgroundColor: '#b1e3b3',
  },
  cellText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
