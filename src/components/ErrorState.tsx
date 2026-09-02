import React, {useMemo} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {useThemeColors} from '@/lib/theme';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Failed to load data',
  onRetry,
}: ErrorStateProps) {
  const colors = useThemeColors();
  const s = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={s.centered}>
      <Text style={s.errorTitle}>Oops!</Text>
      <Text style={s.errorMessage}>{message}</Text>
      {onRetry && (
        <Pressable onPress={onRetry}>
          <Text style={s.retryText}>Tap to retry</Text>
        </Pressable>
      )}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    errorTitle: {
      fontSize: 24,
      fontFamily: 'Montserrat-Bold',
      color: colors.text,
      marginBottom: 8,
    },
    errorMessage: {
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
      color: colors.gray[600],
      textAlign: 'center',
    },
    retryText: {
      fontSize: 14,
      fontFamily: 'Montserrat-SemiBold',
      color: colors.primary,
      marginTop: 16,
      padding: 8,
    },
  });
