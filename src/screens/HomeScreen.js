import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BallInput} from '../components/BallInput';
import {ReboleteoBoard} from '../components/ReboleteoBoard';
import {BingoCardMini} from '../components/BingoCardMini';
import {useBingo} from '../hooks/useBingo';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {cards, markBall, removeCard, duplicateExistingCard, drawnBalls} = useBingo();

  const handleBall = normalized => {
    const result = markBall(normalized);
    if (result) {
      Alert.alert('Balota marcada', result);
    }
  };

  const openMenu = card => {
    Alert.alert('Cartón', `Acciones para #${card.number}`, [
      {text: 'Editar', onPress: () => navigation.navigate('EditCard', {cardId: card.id})},
      {text: 'Duplicar', onPress: () => duplicateExistingCard(card.id)},
      {text: 'Eliminar', style: 'destructive', onPress: () => removeCard(card.id)},
      {text: 'Cancelar', style: 'cancel'},
    ]);
  };

  return (
    <View style={styles.container}>
      <BallInput onSubmit={handleBall} />
      <Text style={styles.sectionTitle}>Reboleteo</Text>
      <ReboleteoBoard balls={drawnBalls} />
      <Text style={styles.sectionTitle}>Cartones (más progreso primero)</Text>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 12}}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CardDetail', {cardId: item.id})}
            onLongPress={() => openMenu(item)}
            style={styles.cardWrapper}>
            <BingoCardMini card={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
  },
  cardWrapper: {
    width: 140,
  },
});
