import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {DataProps} from '../../dto/newsDto.ts';
import NewsCard from './newsCard.tsx';

const News = () => {
  const [newsData, setNewsData] = useState<DataProps>();
  const URL =
    'https://newsapi.org/v2/everything?q=tesla&from=2025-01-06&sortBy=publishedAt&apiKey=99e9331bd52a40b0b0dcde13ef9af4b4';

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
      {newsData ? (
        newsData.articles?.map((item, index) => (
          <NewsCard key={index} NewsItem={item} />
        ))
      ) : (
        <ActivityIndicator size="large" color="#000000" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    minHeight: 200,
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
});

export default News;
