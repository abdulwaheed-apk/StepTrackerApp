import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { GlassContainer } from './GlassContainer';

interface WeeklyProgressProps {
    history: Record<string, number>;
    target: number;
    theme: 'light' | 'dark';
    onPress: () => void;
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ history, target, theme, onPress }) => {
    const isDark = theme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    // Get last 7 days
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d);
    }

    const shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <TouchableOpacity onPress={onPress}>
            <GlassContainer theme={theme} style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={[styles.title, { color: colors.text }]}>Weekly Progress</Text>
                    <ChevronRight size={20} color={colors.subText} />
                </View>

                <View style={styles.barsRow}>
                    {days.map((date, index) => {
                        const key = date.toISOString().split('T')[0];
                        const steps = history[key] || 0;
                        const progress = Math.min(steps / target, 1);
                        const dayLabel = shortDays[date.getDay()];

                        return (
                            <View key={index} style={styles.barWrapper}>
                                <View style={[styles.barTrack, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                                    <View
                                        style={[
                                            styles.barFill,
                                            {
                                                height: `${progress * 100}%`,
                                                backgroundColor: progress >= 1 ? '#10B981' : colors.accent
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.dayLabel, { color: colors.subText }]}>{dayLabel}</Text>
                            </View>
                        );
                    })}
                </View>
            </GlassContainer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    barsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 100,
    },
    barWrapper: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
    },
    barTrack: {
        width: 12,
        height: 80,
        // backgroundColor set inline now
        borderRadius: 6,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        borderRadius: 6,
    },
    dayLabel: {
        marginTop: 8,
        fontSize: 12,
        fontFamily: 'Lexend_600SemiBold',
    }
});
