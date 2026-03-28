import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '@/theme/theme';

type BreathingOrbProps = {
  title: string;
  subtitle: string;
};

export function BreathingOrb({ title, subtitle }: BreathingOrbProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          duration: 4000,
          toValue: 1.12,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          duration: 4000,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [scale]);

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.glow, { transform: [{ scale }] }]} />
      <Animated.View style={[styles.orbWrap, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={['rgba(180,181,255,0.28)', 'rgba(144,215,146,0.12)']}
          style={styles.orb}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    height: 320,
    justifyContent: 'center',
  },
  glow: {
    backgroundColor: 'rgba(180,181,255,0.12)',
    borderRadius: 180,
    height: 260,
    position: 'absolute',
    width: 260,
  },
  orbWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    alignItems: 'center',
    borderRadius: 160,
    height: 240,
    justifyContent: 'center',
    width: 240,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.typography.display,
    fontSize: 42,
  },
  subtitle: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 12,
    letterSpacing: 1.8,
    marginTop: 8,
    textTransform: 'uppercase',
  },
});
