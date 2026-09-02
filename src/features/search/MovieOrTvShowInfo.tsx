import React, {useMemo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import {MovieRuntimeRating} from '@/components/MovieRuntimeRating';
import {useThemeColors} from '@/lib/theme';
import type {SearchMovie, SearchTVShow} from '@/types';

const GENRE_NAMES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

interface MovieOrTvShowInfoProps {
  info: SearchMovie | SearchTVShow;
}

export function MovieOrTvShowInfo({info}: MovieOrTvShowInfoProps) {
  const colors = useThemeColors();
  const isMovie = info.media_type === 'movie';
  const title = isMovie ? info.title : info.name;
  const releaseDate = isMovie ? info.release_date : info.first_air_date;
  const releaseYear = new Date(releaseDate).getFullYear();
  const icon = isMovie ? 'movie-filter' : 'live-tv';
  const genresText = info.genre_ids
    .flatMap(id => {
      const name = GENRE_NAMES[id];
      return name ? [name] : [];
    })
    .join(', ');
  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={s.container}>
      <Text style={s.infoTitle} numberOfLines={2}>
        {title}
      </Text>
      <View style={s.metaRow}>
        <Icon name={icon} color={colors.textMuted} size={16} />
        <Text style={s.mediaType}>{` ${isMovie ? 'Movie' : 'TV Show'}`}</Text>
        {!isNaN(releaseYear) && (
          <Text style={s.mediaType}> • {releaseYear}</Text>
        )}
      </View>
      <MovieRuntimeRating
        rating={info.vote_average}
        textColor={colors.textMuted}
        emptyStarColor={colors.textMuted}
      />
      {genresText ? (
        <Text style={s.genresText} numberOfLines={2}>
          {genresText}
        </Text>
      ) : null}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {flex: 1},
    infoTitle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 14,
      paddingBottom: 8,
      color: colors.text,
    },
    metaRow: {flexDirection: 'row', paddingBottom: 4, alignItems: 'center'},
    mediaType: {
      color: colors.textMuted,
      fontFamily: 'Montserrat-Regular',
      fontSize: 12,
    },
    genresText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 12,
      marginTop: 8,
      width: '100%',
      color: colors.text,
    },
  });
