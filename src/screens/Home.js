import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {map} from 'lodash';
import {
  getAllGenresApi,
  getNewsMoviesApi,
  getGenreMoviesApi,
} from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';

export default function Home({navigation}) {
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getNewsMoviesApi();
      setNewMovies(response.results);
    }

    fetchData();
  }, []);

  useEffect(() => {
    getAllGenresApi().then((response) => {
      setGenreList(response.genres);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then((response) => {
      setGenreMovies(response.results);
    });
  }, [genreSelected]);

  const onChangeGenre = (newGenreId) => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.title}>Nuevas Películas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genresList}>
          {map(genreList, (genre) => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                {color: genre.id !== genreSelected ? '#8697a5' : '#fff'},
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
  },
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },

  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genresList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
