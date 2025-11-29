import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {calculateProgress} from '../utils/bingo';

export const BingoCardMini = ({card}) => {
  const progress = calculateProgress(card);
  const filled = Math.round((progress / 100) * 5);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>#{card.number}</Text>
        <Text style={styles.percent}>{progress}%</Text>
      </View>
      <View style={styles.bullets}>
        {Array.from({length: 5}).map((_, idx) => (
          <View key={idx} style={[styles.dot, idx < filled && styles.dotFilled]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#111',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 16,
  },
  percent: {
    fontSize: 12,
    color: '#444',
  },
  bullets: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#111',
  },
  dotFilled: {
    backgroundColor: '#8bd18b',
  },
});
