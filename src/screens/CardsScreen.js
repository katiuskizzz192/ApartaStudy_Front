import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useBingo} from '../hooks/useBingo';
import {BingoCardMini} from '../components/BingoCardMini';

export const CardsScreen = () => {
  const {cards} = useBingo();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{gap: 12}}
        contentContainerStyle={{gap: 12}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CardDetail', {cardId: item.id})}
            onLongPress={() => navigation.navigate('EditCard', {cardId: item.id})}>
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
  card: {
    flex: 1,
  },
});
