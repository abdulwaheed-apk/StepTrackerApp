import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { Flame, Footprints, Map as MapIcon, Clock } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { GlassContainer } from './GlassContainer';

interface StatsDisplayProps {
    steps: number;
    target: number;
    calories: number;
    distance: number;
    duration: number;
    theme: 'light' | 'dark';
    viewMode: string;
    historyTotal?: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
    steps = 0,
    target = 10000,
    calories = 0,
    distance = 0,
    duration = 0,
    theme,
    viewMode,
    historyTotal = 0
}) => {
    const isDark = theme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    const progress = Math.min(steps / target, 1);

    // Stats Grid Item Component
    const StatItem = ({ icon: Icon, value, label, color }: any) => (
        <View style={styles.statItem}>
            <Icon size={20} color={color} style={{ marginBottom: 4 }} />
            <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
            <Text style={[styles.statLabel, { color: colors.subText }]}>{label}</Text>
        </View>
    );

    if (viewMode !== 'daily') {
        return (
            <GlassContainer theme={theme} style={styles.container}>
                <View style={styles.centerContent}>
                    <Text style={[styles.bigNumber, { color: colors.text }]}>
                        {historyTotal.toLocaleString()}
                    </Text>
                    <Text style={[styles.subText, { color: colors.subText }]}>
                        total steps
                    </Text>
                </View>
            </GlassContainer>
        );
    }

    return (
        <GlassContainer theme={theme} style={styles.container}>
            <View style={styles.topSection}>
                <Progress.Circle
                    progress={progress}
                    size={160}
                    thickness={12}
                    color={colors.accent}
                    unfilledColor={colors.chartTrack}
                    borderWidth={0}
                    strokeCap="round"
                />
                <View style={styles.absoluteCenter}>
                    <Footprints size={28} color={colors.accent} />
                    <Text style={[styles.mainValue, { color: colors.text }]}>{steps.toLocaleString()}</Text>
                    <Text style={[styles.microLabel, { color: colors.subText }]}>Steps</Text>
                </View>
            </View>

            <View style={styles.grid}>
                <StatItem
                    icon={Flame}
                    value={Math.round(calories).toString()}
                    label="Cal"
                    color={colors.error}
                />
                <StatItem
                    icon={MapIcon}
                    value={distance.toFixed(2)}
                    label="Km"
                    color={colors.info}
                />
                <StatItem
                    icon={Clock}
                    value={Math.round(duration).toString()}
                    label="Min"
                    color={colors.success}
                />
            </View>
        </GlassContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical: 10,
    },
    centerContent: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    topSection: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    absoluteCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainValue: {
        fontSize: 36, // Slight bump
        fontFamily: 'Lexend_800ExtraBold',
        marginTop: 4,
    },
    microLabel: {
        fontSize: 12,
        fontFamily: 'Lexend_600SemiBold',
        textTransform: 'uppercase',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20, // Clean readable size
        fontFamily: 'Lexend_700Bold',
        marginVertical: 2,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Lexend_500Medium',
    },
    bigNumber: {
        fontSize: 42,
        fontFamily: 'Lexend_800ExtraBold',
    },
    subText: {
        fontSize: 14,
        fontFamily: 'Lexend_400Regular',
    }
});
