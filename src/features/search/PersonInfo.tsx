import React, {useMemo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import {useThemeColors} from '@/lib/theme';
import type {SearchPerson} from '@/types';

interface PersonInfoProps {
  info: SearchPerson;
}

export function PersonInfo({info}: PersonInfoProps) {
  const colors = useThemeColors();
  const knownFor = info.known_for ?? [];
  const movies = knownFor.map(item =>
    'title' in item ? item.title : item.name,
  );
  const moviesText = movies.join(', ');
  const s = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={s.container}>
      <Text style={s.actorName} numberOfLines={2}>
        {info.name}
      </Text>
      <View style={s.metaRow}>
        <Icon name="person" color={colors.textMuted} size={16} />
        <Text style={s.mediaType}> Actor</Text>
      </View>
      {movies.length > 0 && (
        <Text numberOfLines={3} style={s.moviesTxt}>
          {moviesText}
        </Text>
      )}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {flex: 1},
    actorName: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 14,
      paddingBottom: 8,
      color: colors.text,
    },
    metaRow: {flexDirection: 'row', alignItems: 'center'},
    mediaType: {
      fontFamily: 'Montserrat-Regular',
      color: colors.textMuted,
      fontSize: 12,
    },
    moviesTxt: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 12,
      marginTop: 8,
      width: '90%',
      color: colors.text,
    },
  });
