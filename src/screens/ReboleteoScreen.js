import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useBingo} from '../hooks/useBingo';
import {ReboleteoBoard} from '../components/ReboleteoBoard';
import {ReboleteoGrid} from '../components/ReboleteoGrid';

export const ReboleteoScreen = () => {
  const {drawnBalls, setDrawnBalls} = useBingo();
  const [mode, setMode] = useState('lista');

  return (
    <View style={styles.container}>
      <View style={styles.toggleRow}>
        <Button title="Lista" onPress={() => setMode('lista')} />
        <Button title="Tablero" onPress={() => setMode('grid')} />
        <Button title="Limpiar" color="#b00020" onPress={() => setDrawnBalls([])} />
      </View>
      <Text style={styles.subtitle}>Balotas cantadas: {drawnBalls.length}</Text>
      {mode === 'lista' ? (
        <ReboleteoBoard balls={drawnBalls} />
      ) : (
        <ReboleteoGrid balls={drawnBalls} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
});
