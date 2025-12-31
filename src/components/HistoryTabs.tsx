import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { GlassContainer } from './GlassContainer';

interface HistoryTabsProps {
    viewMode: 'daily' | 'weekly' | 'monthly';
    setViewMode: (mode: 'daily' | 'weekly' | 'monthly') => void;
    theme: 'light' | 'dark';
}

export const HistoryTabs: React.FC<HistoryTabsProps> = ({ viewMode, setViewMode, theme }) => {
    const isDark = theme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    // Custom "Glass" for the tab container
    return (
        <GlassContainer theme={theme} style={styles.container} intensity={20}>
            <View style={styles.row}>
                {(['daily', 'weekly', 'monthly'] as const).map((m) => {
                    const isActive = viewMode === m;
                    return (
                        <TouchableOpacity
                            key={m}
                            style={[
                                styles.tab,
                                isActive && {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)',
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 4,
                                }
                            ]}
                            onPress={() => setViewMode(m)}
                        >
                            <Text style={[
                                styles.text,
                                { color: isActive ? colors.text : colors.subText },
                                isActive && { fontWeight: '700' }
                            ]}>
                                {m.charAt(0).toUpperCase() + m.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </GlassContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 100, // Pill shape container
        padding: 6,
    },
    row: {
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 50,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
});
