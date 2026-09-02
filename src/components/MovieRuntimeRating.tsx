import React from 'react';
import {View, Text, StyleSheet, type ViewStyle} from 'react-native';
import {StarsRating} from './StarsRating';

interface MovieRuntimeRatingProps {
  rating: number;
  runtime?: number;
  style?: ViewStyle;
  textColor?: string;
  starColor?: string;
  emptyStarColor?: string;
}

export function MovieRuntimeRating({
  rating,
  runtime,
  style,
  textColor = '#fff',
  starColor = '#F5B642',
  emptyStarColor = '#fff',
}: MovieRuntimeRatingProps) {
  // Renders even for unrated titles ("NR") so list rows keep a stable height
  // and the /5 scale is always explicit.
  return (
    <View style={[styles.row, style]}>
      <View style={styles.innerRow}>
        <StarsRating
          rating={rating}
          color={starColor}
          emptyColor={emptyStarColor}
        />
        <Text style={[styles.textRating, {color: textColor}]}>
          {rating > 0 ? `${(rating / 2).toFixed(1)}/5` : 'NR'}
        </Text>
        {runtime ? (
          <Text
            style={[
              styles.runtime,
              {color: textColor},
            ]}>{`  |  ${runtime} mins`}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textRating: {fontFamily: 'Montserrat-Medium', marginLeft: 8, fontSize: 14},
  runtime: {fontFamily: 'Montserrat-Medium', fontSize: 14},
  row: {flexDirection: 'row'},
  innerRow: {flexDirection: 'row', alignItems: 'center'},
});
