import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LETTERS} from '../utils/bingo';

export const ReboleteoBoard = ({balls}) => {
  const grouped = LETTERS.map(letter => ({
    letter,
    list: balls
      .filter(b => b.startsWith(letter))
      .map(b => parseInt(b.slice(1), 10))
      .sort((a, b) => a - b),
  }));
  return (
    <View style={styles.container}>
      {grouped.map(group => (
        <View key={group.letter} style={styles.row}>
          <Text style={styles.letter}>{group.letter}</Text>
          <Text style={styles.list}>{group.list.join(', ') || '—'}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  letter: {
    width: 24,
    fontWeight: '800',
    fontSize: 18,
  },
  list: {
    flex: 1,
    fontSize: 14,
  },
});
