import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Pedometer } from 'expo-sensors';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useStepTracker } from '../context/StepTrackerContext';
import { COLORS } from '../constants/colors';
import { GlassContainer } from '../components/GlassContainer';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DetailsScreen = ({ navigation }: any) => {
    const { resolvedTheme } = useTheme();
    const { target } = useStepTracker();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthData, setMonthData] = useState<{ date: Date, steps: number }[]>([]);
    const [loading, setLoading] = useState(false);

    const isDark = resolvedTheme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    useEffect(() => {
        loadMonthData();
    }, [currentDate]);

    const loadMonthData = async () => {
        setLoading(true);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Get number of days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const data = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const start = new Date(year, month, i, 0, 0, 0);
            const end = new Date(year, month, i, 23, 59, 59);

            // Should check if date is in future, if so 0
            if (date > new Date()) {
                data.push({ date, steps: 0 });
                continue;
            }

            try {
                // Determine if we can query this far back. Pedometer on Android supports it.
                // iOS strict privacy might limit to 7 days.
                // For this demo, we try. If failure, we use 0.
                const result = await Pedometer.getStepCountAsync(start, end);
                data.push({ date, steps: result.steps });
            } catch (e) {
                data.push({ date, steps: 0 });
            }
        }
        setMonthData(data);
        setLoading(false);
    };

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    const totalSteps = monthData.reduce((acc, curr) => acc + curr.steps, 0);
    const avgSteps = monthData.length > 0 ? Math.round(totalSteps / monthData.length) : 0; // naive avg including future 0s? 
    // better avg: only active days
    const activeDays = monthData.filter(d => d.steps > 0).length;
    const realAvg = activeDays > 0 ? Math.round(totalSteps / activeDays) : 0;

    return (
        <LinearGradient
            colors={colors.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={28} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: colors.text }]}>History</Text>
                </View>

                {/* Month Navigator */}
                <GlassContainer theme={resolvedTheme} style={styles.navContainer}>
                    <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navBtn}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.monthTitle, { color: colors.text }]}>
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navBtn}>
                        <ChevronRight size={24} color={colors.text} />
                    </TouchableOpacity>
                </GlassContainer>

                {/* Stats Summary */}
                <View style={styles.summaryRow}>
                    <GlassContainer theme={resolvedTheme} style={styles.summaryCard}>
                        <Text style={[styles.summaryLabel, { color: colors.subText }]}>Total</Text>
                        <Text style={[styles.summaryValue, { color: colors.text }]}>{totalSteps.toLocaleString()}</Text>
                    </GlassContainer>
                    <View style={{ width: 10 }} />
                    <GlassContainer theme={resolvedTheme} style={styles.summaryCard}>
                        <Text style={[styles.summaryLabel, { color: colors.subText }]}>Daily Avg</Text>
                        <Text style={[styles.summaryValue, { color: colors.text }]}>{realAvg.toLocaleString()}</Text>
                    </GlassContainer>
                </View>

                {/* Bar Chart / List */}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 50 }} />
                    ) : (
                        monthData.map((day, index) => {
                            const progress = Math.min(day.steps / target, 1);
                            const isMet = day.steps >= target;
                            const isToday = day.date.toDateString() === new Date().toDateString();

                            return (
                                <View key={index} style={styles.row}>
                                    <View style={styles.dateCol}>
                                        <Text style={[styles.dayName, { color: colors.subText }]}>
                                            {DAYS[day.date.getDay()]}
                                        </Text>
                                        <Text style={[styles.dayNum, { color: colors.text, fontWeight: isToday ? 'bold' : '400' }]}>
                                            {day.date.getDate()}
                                        </Text>
                                    </View>

                                    <View style={[
                                        styles.barContainer,
                                        { backgroundColor: colors.chartTrack }
                                    ]}>
                                        <View style={[
                                            styles.barFill,
                                            {
                                                width: `${progress * 100}%`,
                                                backgroundColor: isMet ? colors.success : (isToday ? colors.accent : colors.chartInactive),
                                                minWidth: 4
                                            }
                                        ]} />
                                    </View>

                                    <Text style={[styles.stepLabel, { color: colors.text }]}>{day.steps > 0 ? day.steps.toLocaleString() : '-'}</Text>
                                </View>
                            )
                        })
                    )}
                </ScrollView>

            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: { marginRight: 16 },
    title: {
        fontSize: 24,
        fontFamily: 'Lexend_700Bold',
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 24,
        padding: 12,
        marginBottom: 16,
    },
    navBtn: {
        padding: 8,
    },
    monthTitle: {
        fontSize: 18,
        fontFamily: 'Lexend_600SemiBold',
    },
    summaryRow: {
        flexDirection: 'row',
        marginHorizontal: 24,
        marginBottom: 20,
    },
    summaryCard: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 12,
        fontFamily: 'Lexend_500Medium',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    summaryValue: {
        fontSize: 20,
        fontFamily: 'Lexend_700Bold',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 50,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        height: 30,
    },
    dateCol: {
        width: 40,
        alignItems: 'flex-start',
    },
    dayName: {
        fontSize: 10,
        fontFamily: 'Lexend_400Regular',
    },
    dayNum: {
        fontSize: 14,
        fontFamily: 'Lexend_600SemiBold',
    },
    barContainer: {
        flex: 1,
        height: 12,
        // backgroundColor: handled via style prop in render if needed, or dynamic
        // But here it was static. Let's make it transparent or use chartTrack if we can pass theme.
        // Since this is in StyleSheet, we can't use 'colors'.
        // We must override in render.
        // backgroundColor: 'rgba(0,0,0,0.03)', 
        // REMOVED fixed color, will apply in render
        borderRadius: 6,
        marginHorizontal: 12,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 6,
    },
    stepLabel: {
        width: 50,
        textAlign: 'right',
        fontSize: 12,
        fontFamily: 'Lexend_500Medium',
    }
});
