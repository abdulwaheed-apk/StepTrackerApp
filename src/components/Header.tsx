import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native'; // Gear icon
import { COLORS } from '../constants/colors';
import { GLOBAL_STYLES } from '../constants/globalStyles';


interface HeaderProps {
    theme: 'light' | 'dark';
    onSettingsPress: () => void;
    streak?: number;
    userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ theme, onSettingsPress, streak = 0, userName = '' }) => {
    const isDark = theme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;
    const name = userName ? userName : 'Friend';

    return (
        <View style={styles.header}>
            <View>
                <Text style={[styles.welcome, { color: colors.subText }]}>Your Own Personal Fitness tracker app</Text>
                <Text style={[styles.title, { color: colors.text }]}>Hi {name} 👋</Text>
                {streak > 0 && (
                    <View style={[styles.streakRow]}>
                        <View style={[styles.streakBadge, { borderColor: colors.accent, backgroundColor: colors.streakBackground }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: colors.streakText }}>🔥 {streak} Days Streak</Text>
                        </View>
                    </View>
                )}
            </View>

            <TouchableOpacity
                onPress={onSettingsPress}
                style={[styles.button, { backgroundColor: colors.glass }]}
            >
                <Settings size={24} color={colors.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        ...GLOBAL_STYLES.rowBetween,
        alignItems: 'flex-start', // Override alignment
        marginBottom: 20,
        marginTop: 10,
    },
    welcome: {
        ...GLOBAL_STYLES.caption,
        marginBottom: 4,
    },
    title: {
        ...GLOBAL_STYLES.display,
        fontSize: 32, // Specific override if needed, or stick to display size
    },
    streakRow: {
        marginTop: 8,
        flexDirection: 'row',
    },
    streakBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
    },
    button: {
        padding: 10,
        borderRadius: 50,
        marginTop: 4,
    }
});
