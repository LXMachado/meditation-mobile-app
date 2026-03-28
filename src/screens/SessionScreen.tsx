import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { BreathingOrb } from '@/components/BreathingOrb';
import { Screen } from '@/components/Screen';
import { meditationSession } from '@/data/tracks';
import { theme } from '@/theme/theme';

export function SessionScreen() {
  const navigation = useNavigation();
  const [stepIndex, setStepIndex] = useState(0);
  const step = meditationSession.steps[stepIndex];
  const timeLeft = meditationSession.steps
    .slice(stepIndex)
    .reduce((sum, sessionStep) => sum + sessionStep.seconds, 0);

  return (
    <Screen padded={false} scrollable={false}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons color={theme.colors.text} name="close" size={20} />
          </Pressable>
          <View style={styles.topTitle}>
            <Text style={styles.topEyebrow}>Session</Text>
            <Text style={styles.topText}>{meditationSession.title}</Text>
          </View>
          <View style={styles.iconButton}>
            <Ionicons color={theme.colors.textMuted} name="ellipsis-horizontal" size={20} />
          </View>
        </View>

        <View style={styles.progressBlock}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>
              Step {stepIndex + 1} of {meditationSession.steps.length}
            </Text>
            <Text style={styles.progressLabel}>{Math.floor(timeLeft / 60)} min left</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${((stepIndex + 1) / meditationSession.steps.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.phaseLabel}>
          <Text style={styles.phaseText}>{step.label}</Text>
        </View>

        <BreathingOrb subtitle={`Hold for ${Math.max(4, Math.round(step.seconds / 60))}s`} title={step.title} />

        <Text style={styles.instruction}>{step.instruction}</Text>

        <View style={styles.stepRow}>
          {meditationSession.steps.map((item, index) => {
            const active = index === stepIndex;
            return (
              <Pressable
                key={item.id}
                onPress={() => setStepIndex(index)}
                style={[styles.stepPill, active && styles.stepPillActive]}
              >
                <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>
                  {(index + 1).toString().padStart(2, '0')}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.bottomControls}>
          <Pressable style={styles.iconButton}>
            <Ionicons color={theme.colors.textMuted} name="volume-high-outline" size={18} />
          </Pressable>
          <Pressable style={styles.pauseButton}>
            <Ionicons color={theme.colors.onPrimary} name="pause" size={22} />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 42,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(31,35,68,0.5)',
    borderRadius: theme.radii.pill,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  topTitle: {
    alignItems: 'center',
    gap: 4,
  },
  topEyebrow: {
    color: theme.colors.primaryDim,
    fontFamily: theme.typography.label,
    fontSize: 10,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  topText: {
    color: theme.colors.text,
    fontFamily: theme.typography.title,
    fontSize: 15,
  },
  progressBlock: {
    marginTop: 24,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  progressTrack: {
    backgroundColor: 'rgba(165,168,209,0.2)',
    borderRadius: theme.radii.pill,
    height: 6,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: theme.colors.primary,
    height: '100%',
  },
  phaseLabel: {
    alignSelf: 'flex-start',
    marginTop: 28,
  },
  phaseText: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 12,
    letterSpacing: 2.8,
    textTransform: 'uppercase',
  },
  instruction: {
    color: theme.colors.text,
    fontFamily: theme.typography.display,
    fontSize: 28,
    lineHeight: 38,
    textAlign: 'center',
  },
  stepRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  stepPill: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.radii.pill,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  stepPillActive: {
    backgroundColor: theme.colors.primary,
  },
  stepLabel: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
  },
  stepLabelActive: {
    color: theme.colors.onPrimary,
  },
  bottomControls: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
  },
  pauseButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.pill,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
});
