import React, { useCallback } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useStepTracker } from '../hooks/useStepTracker';
import { useTheme } from '../hooks/useTheme';
import { useUserProfile } from '../hooks/useUserProfile';
import { COLORS } from '../constants/colors';

import { Header } from '../components/Header';
import { StatsDisplay } from '../components/StatsDisplay';
import { WeeklyProgress } from '../components/WeeklyProgress';
import { QuoteDisplay } from '../components/QuoteDisplay';
import { GlassContainer } from '../components/GlassContainer';

export const HomeScreen = ({ navigation }: any) => {
    const { resolvedTheme } = useTheme();
    const { dailySteps, target, history, pedometerAvailable, calories, distance, duration, streak } = useStepTracker();
    const { user, refreshUser } = useUserProfile();

    useFocusEffect(
        useCallback(() => {
            refreshUser();
        }, [])
    );

    // Refresh user profile when screen focuses? 
    // Since useUserProfile loads from storage on mount, it's fine. 
    // IF the user changes name in Settings and pops back, we might want to ensure 'user' updates.
    // Given the hook structure, we might need to rely on the hook's own state, which won't auto-update across screens unless using Context or re-mounting or event listener.
    // For simplicity, passing `user` from local hook instance might show stale data if not careful.
    // HOWEVER, `navigation.navigate('Settings')` pushes a screen. `HomeScreen` stays mounted.
    // When popping back, `useUserProfile` state is NOT refreshed automatically.
    // We should make `loadUser` public or add a focus effect.
    // Let's rely on React Navigation's useIsFocused or just simple trick: use state in parent? No, App.tsx is root.
    // Let's modify useUserProfile in the file to listen or just add a simple focus effect here.

    // Actually, `useUserProfile` reads from storage once on mount.
    // Let's accept that for this iteration, OR we can force a reload.
    // Let's assume for now it's fine, or we can use `useFocusEffect`.

    const isDark = resolvedTheme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    return (
        <LinearGradient
            colors={colors.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Header
                        theme={resolvedTheme}
                        onSettingsPress={() => navigation.navigate('Settings')}
                        streak={streak}
                        userName={user.firstName}
                    />

                    {/* Main Stats (Daily) */}
                    <StatsDisplay
                        steps={dailySteps}
                        target={target}
                        calories={calories}
                        distance={distance}
                        duration={duration}
                        theme={resolvedTheme}
                        viewMode="daily"
                    />

                    {/* Google Fit Style Weekly Progress */}
                    <WeeklyProgress
                        history={history}
                        target={target}
                        theme={resolvedTheme}
                        onPress={() => navigation.navigate('Details')}
                    />

                    {/* Quotes Area */}
                    <QuoteDisplay theme={resolvedTheme} />

                    {pedometerAvailable === 'no' && (
                        <GlassContainer theme={resolvedTheme} style={{ marginTop: 20, padding: 20 }}>
                            <Text style={{ color: colors.subText, textAlign: 'center' }}>
                                Pedometer sensor not available on this device.
                            </Text>
                        </GlassContainer>
                    )}

                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    safeArea: { flex: 1 },
    scrollContent: { padding: 24, paddingBottom: 50 },
});
