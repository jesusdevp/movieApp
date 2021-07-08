import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Rating} from 'react-native-ratings';
import {map} from 'lodash';
import {IconButton, Text, Title} from 'react-native-paper';
import {getMovieByIdApi} from '../api/movies';
import ModalVideo from '../components/ModalVIdeo';
import {BASE_PATH_IMG} from '../utils/config';
import starDark from '../assets/png/starDark.png';
import startLight from '../assets/png/starLight.png';
import usePreferences from '../hooks/usePreferences';

export default function Movie({route}) {
  const {
    params: {id},
  } = route;

  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    getMovieByIdApi(id).then((response) => {
      setMovie(response);
    });
  }, []);

  if (!movie) return null;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage
          posterPath={movie.poster_path}
          setShowVideo={setShowVideo}
        />
        <MovieTitle movie={movie} />
        <MovieRating
          voteCount={movie.vote_count}
          voteAverage={movie.vote_average}
        />
        <Text style={styles.overview}>
          Fecha de lanzamiento: {movie.release_date}
        </Text>
        <Text style={[styles.overview, {marginBottom: 30}]}>
          {movie.overview}
        </Text>
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
}

function MovieImage({posterPath, setShowVideo}) {
  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{uri: `${BASE_PATH_IMG}/w500${posterPath}`}}
      />
      <View style={styles.viewPlay}>
        <IconButton
          icon="play"
          color="#fff"
          size={40}
          style={styles.play}
          onPress={() => setShowVideo(true)}
        />
      </View>
    </View>
  );
}

function MovieTitle(props) {
  const {movie} = props;

  return (
    <View style={styles.viewInfo}>
      <Title> {movie.title} </Title>
      <View style={styles.viewGenre}>
        {map(movie.genres, (genre) => (
          <Text key={genre.id} style={styles.genre}>
            {' '}
            {genre.name}{' '}
          </Text>
        ))}
      </View>
    </View>
  );
}

function MovieRating(props) {
  const {voteCount, voteAverage} = props;
  const media = voteAverage / 2;
  const {theme} = usePreferences();

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : startLight}
        ratingColor="#ffc285"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
      />
      <Text style={{fontSize: 16, marginRight: 5}}>{media}</Text>
      <Text style={{fontSize: 12, color: '#8697a5'}}>{voteCount} votos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
    zIndex: 1,
  },

  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 100,
    zIndex: 2,
  },
  play: {
    backgroundColor: '#1ea1f2',
    marginTop: -30,
    marginRight: 30,
  },

  viewInfo: {
    marginHorizontal: 30,
  },

  viewGenre: {
    flexDirection: 'row',
  },

  genre: {
    marginRight: 20,
    color: '#8697a5',
  },

  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#8697a5',
  },
});
