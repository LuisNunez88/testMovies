import {SafeAreaView, View, StyleSheet, ScrollView, Text} from 'react-native';
import {FlatList} from 'react-native-bidirectional-infinite-scroll';
import React, {useState, useEffect} from 'react';
import {fetchMovies} from '../core/Api/index';
import MovieCard from '../components/MovieCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/Colors';
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getMovies = async pag => {
    const resp = await fetchMovies(pag);
    if (resp.Response) {
      const newMovies = [...resp.Search];
      if (pag > page) {
        setMovies(m => {
          return newMovies.concat(m);
        });
      } else {
        setMovies(m => {
          return m.concat(newMovies);
        });
      }
      setPage(pag);
    }
  };

  const loadOlds = async () => {
    if (page > 1) {
      await getMovies(page - 1);
    }
  };

  const loadMore = async () => {
    console.log('carga mas');
    await getMovies(page + 1);
  };

  useEffect(() => {
    getMovies(1);
  }, []);

  return (
    <>
      {Object.keys(movies).length > 0 && (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                flexWrap: 'wrap',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons
                style={{marginRight: 5}}
                name="movie"
                color={COLORS.WHITE}
                size={30}
              />
              <Text style={[styles.title, {color: COLORS.WHITE}]}>
                {' '}
                Movies Test
              </Text>
            </View>
            <View style={{flexWrap: 'wrap'}} />
          </View>
          <FlatList
            data={movies}
            numColumns={2}
            onEndReached={loadOlds}
            onStartReached={loadMore}
            renderItem={({index, item}) => (
              <View style={{flex: 1}}>
                <MovieCard movie={item} key={index} />
              </View>
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: COLORS.SHADOW,
    borderBottomWidth: 1,
    backgroundColor: COLORS.BLACK,
  },
  title: {
    fontSize: 22,
    fontFamily: 'poppins-sb',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 120,

    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
});
