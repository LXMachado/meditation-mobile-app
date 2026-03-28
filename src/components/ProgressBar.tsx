import React from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';

import { theme } from '@/theme/theme';

type ProgressBarProps = {
  value: number;
  maximumValue: number;
  onSlidingComplete?: (value: number) => void;
  minimumTrackTintColor?: string;
};

export function ProgressBar({
  value,
  maximumValue,
  onSlidingComplete,
  minimumTrackTintColor = theme.colors.primary,
}: ProgressBarProps) {
  return (
    <View style={styles.wrap}>
      <Slider
        maximumTrackTintColor="rgba(165, 168, 209, 0.25)"
        maximumValue={maximumValue || 1}
        minimumTrackTintColor={minimumTrackTintColor}
        onSlidingComplete={onSlidingComplete}
        thumbTintColor={theme.colors.text}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    marginHorizontal: -12,
  },
});
