import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthButton } from '@/components/AuthButton';
import { AuthShell } from '@/components/AuthShell';
import { useAuthStore } from '@/store/useAuthStore';
import { theme } from '@/theme/theme';
import type { AuthStackParamList } from '@/navigation/types';

export function AuthSuccessScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, 'AuthSuccess'>>();
  const completeRegistration = useAuthStore((state) => state.completeRegistration);

  const { variant, email, user } = route.params;

  const config =
    variant === 'account-created'
      ? {
          title: "You're all set.",
          subtitle: 'The waters are calm. Your personal sanctuary is ready for your first breath.',
          eyebrow: 'Identity Verified & Connected',
          buttonLabel: 'Continue',
          secondaryLabel: 'Back to sign in',
          onContinue: () => {
            if (user) {
              completeRegistration(user);
            }
          },
        }
      : {
          title: 'Reset link sent.',
          subtitle: `A reset email was sent to ${email}. Open it when you're ready to continue.`,
          eyebrow: 'Secure Submerged Access',
          buttonLabel: 'Back to Sign In',
          secondaryLabel: 'Send another',
          onContinue: () => navigation.navigate('SignIn'),
        };

  return (
    <AuthShell subtitle={config.subtitle} title={config.title}>
      <View style={styles.content}>
        <View style={styles.iconOrb}>
          <Ionicons color={theme.colors.primary} name="checkmark-done-outline" size={54} />
        </View>
        <Text style={styles.eyebrow}>{config.eyebrow}</Text>
        <AuthButton label={config.buttonLabel} onPress={config.onContinue} />
        <Pressable
          onPress={() =>
            variant === 'account-created'
              ? navigation.navigate('SignIn')
              : navigation.navigate('ForgotPassword')
          }
        >
          <Text style={styles.secondary}>{config.secondaryLabel}</Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: 18,
    paddingVertical: 18,
  },
  iconOrb: {
    alignItems: 'center',
    backgroundColor: 'rgba(180,181,255,0.12)',
    borderRadius: 88,
    height: 176,
    justifyContent: 'center',
    width: 176,
  },
  eyebrow: {
    color: theme.colors.primaryDim,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 2.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  secondary: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});
