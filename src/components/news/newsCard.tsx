import React from 'react';
import {Text, View, Image, StyleSheet, Pressable, Linking} from 'react-native';
import {Article} from '../../dto/newsDto.ts';
const NewsCard = ({NewsItem}: {NewsItem: Article}) => {
  return (
    <Pressable
      onPress={() => {
        Linking.openURL(NewsItem.url);
      }}>
      <View style={styles.cardContainer}>
        <Image source={{uri: NewsItem.urlToImage}} style={styles.userImage} />
        <View style={styles.userItem}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {NewsItem.title}
          </Text>
          <Text style={styles.author}>{NewsItem.author}</Text>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
    width: 'auto',
    height: 126,
    backgroundColor: '#bed1d7',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userImage: {
    height: '100%',
    width: 110,
  },
  userItem: {
    height: 100,
    width: 260,
    paddingRight: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 15,
    marginRight: 12,
    fontWeight: '600',
    color: '#2F363F',
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: '#666',
  },
});
export default NewsCard;
