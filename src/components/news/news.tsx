import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {DataProps} from '../../dto/newsDto.ts';
import NewsCard from './newsCard.tsx';

const News = () => {
  const [newsData, setNewsData] = useState<DataProps>();
  const URL =
    'https://newsapi.org/v2/top-headlines?category=health&pageSize=5&apiKey=15826378313d4e68806e75fd56ed682f';

  useEffect(() => {
    FetchNewsData();
  }, []);
  const FetchNewsData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setNewsData(json);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titles}>News Articles</Text>
      <View style={styles.card}>
        {newsData ? (
          newsData.articles.map((item, index) => (
            <NewsCard key={index} NewsItem={item} />
          ))
        ) : (
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.loader}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
    marginTop: 25,
  },
  titles: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 8,
  },
  loader: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  card: {
    height: 'auto',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default News;
