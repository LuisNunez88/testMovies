import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts';

export default function MovieCard({movie}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <ImageBackground
          style={{
            width: 150,
            height: 200,
            margin: 10,
            borderRadius: 12,
          }}
          imageStyle={{borderRadius: 12, backgroundColor: COLORS.BLACK}}
          source={{uri: movie.Poster}}>
          {/* <Image
            style={{
              width: 150,
              height: 200,
              margin: 10,
              borderRadius: 10,
            }}
            source={{uri: movie.Poster}}
          /> */}
          <View style={styles.imgContainer}>
            <Text style={styles.movieTitle} numberOfLines={3}>
              {movie.Title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    fontFamily: FONTS.EXTRA_BOLD,
    color: COLORS.WHITE,
    paddingVertical: 2,
    marginTop: 5,
    width: 150,
    paddingLeft: 10,
  },
  movieSubTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.BLACK,
    opacity: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 3,
    width: 150,
  },
});
