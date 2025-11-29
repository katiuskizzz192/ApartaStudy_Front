import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useBingo} from '../hooks/useBingo';
import {BingoCard} from '../components/BingoCard';
import {evaluateCard} from '../utils/bingo';

export const CardDetailScreen = () => {
  const route = useRoute();
  const {cardId} = route.params;
  const {cards} = useBingo();
  const card = cards.find(c => c.id === cardId);

  const evaluation = useMemo(() => (card ? evaluateCard(card) : {lines: [], completed: false}), [card]);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el cartón.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BingoCard card={card} />
      <Text style={styles.statusTitle}>Estado</Text>
      {evaluation.lines.length === 0 ? (
        <Text style={styles.status}>Sin líneas completadas aún.</Text>
      ) : (
        evaluation.lines.map((line, idx) => (
          <Text key={idx} style={styles.status}>
            {line.type} {line.index + 1}
          </Text>
        ))
      )}
      {evaluation.completed && <Text style={styles.bingo}>¡BINGO COMPLETO!</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    gap: 10,
  },
  statusTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  status: {
    fontSize: 14,
  },
  bingo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2e7d32',
    marginTop: 10,
  },
});
