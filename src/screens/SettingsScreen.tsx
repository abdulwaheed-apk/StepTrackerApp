import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, User, Ruler, Target, Github, MessageSquare } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';
import { GlassContainer } from '../components/GlassContainer';
import { useUserProfile } from '../hooks/useUserProfile';
import { useStepTracker } from '../context/StepTrackerContext';

export const SettingsScreen = ({ navigation }: any) => {
    const { resolvedTheme, toggleTheme } = useTheme();
    const { user, updateUser } = useUserProfile();
    const { target, updateTarget } = useStepTracker();

    // Local state for inputs to avoid jitter
    const [localTarget, setLocalTarget] = useState('');
    const [localWeight, setLocalWeight] = useState('');

    useEffect(() => {
        setLocalTarget(target.toString());
    }, [target]);

    useEffect(() => {
        setLocalWeight(user.weight);
    }, [user.weight]);

    const isDark = resolvedTheme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    const handleSave = () => {
        const t = parseInt(localTarget);
        if (!isNaN(t)) updateTarget(t);
        updateUser({ weight: localWeight });
        navigation.goBack();
    };

    const openGithub = () => {
        Linking.openURL('https://github.com/abdulwaheed-apk/StepTrackerApp');
    };

    return (
        <LinearGradient
            colors={colors.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleSave} style={styles.backBtn}>
                        <ChevronLeft size={28} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>

                    {/* User Profile Section */}
                    <Text style={[styles.sectionTitle, { color: colors.subText }]}>PROFILE</Text>
                    <GlassContainer theme={resolvedTheme} style={styles.section}>
                        <View style={styles.inputRow}>
                            <User size={20} color={colors.accent} style={styles.icon} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="First Name"
                                placeholderTextColor={colors.subText}
                                value={user.firstName}
                                onChangeText={(t) => updateUser({ firstName: t })}
                            />
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.glassBorder }]} />
                        <View style={styles.inputRow}>
                            <User size={20} color={colors.accent} style={styles.icon} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Last Name"
                                placeholderTextColor={colors.subText}
                                value={user.lastName}
                                onChangeText={(t) => updateUser({ lastName: t })}
                            />
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.glassBorder }]} />
                        <View style={styles.inputRow}>
                            <Ruler size={20} color={colors.accent} style={styles.icon} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Weight (kg)"
                                placeholderTextColor={colors.subText}
                                value={localWeight}
                                onChangeText={setLocalWeight}
                                keyboardType="numeric"
                            />
                        </View>
                    </GlassContainer>

                    {/* Goals Section */}
                    <Text style={[styles.sectionTitle, { color: colors.subText }]}>GOALS</Text>
                    <GlassContainer theme={resolvedTheme} style={styles.section}>
                        <View style={styles.inputRow}>
                            <Target size={20} color={colors.accent} style={styles.icon} />
                            <Text style={[styles.label, { color: colors.text }]}>Daily Step Goal</Text>
                            <TextInput
                                style={[styles.inputRight, { color: colors.accent }]}
                                value={localTarget}
                                onChangeText={setLocalTarget}
                                keyboardType="numeric"
                            />
                        </View>
                    </GlassContainer>

                    {/* Preferences Section */}
                    <Text style={[styles.sectionTitle, { color: colors.subText }]}>PREFERENCES</Text>
                    <GlassContainer theme={resolvedTheme} style={styles.section}>
                        <View style={styles.switchRow}>
                            <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                            />
                        </View>
                    </GlassContainer>

                    {/* Community Section */}
                    <Text style={[styles.sectionTitle, { color: colors.subText }]}>COMMUNITY</Text>
                    <TouchableOpacity onPress={openGithub}>
                        <GlassContainer theme={resolvedTheme} style={styles.section}>
                            <View style={styles.inputRow}>
                                <Github size={20} color={colors.text} style={styles.icon} />
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, { color: colors.text }]}>GitHub</Text>
                                    <Text style={[styles.subLabel, { color: colors.subText }]}>Report issues or contribute</Text>
                                </View>
                                <ChevronLeft size={20} color={colors.subText} style={{ transform: [{ rotate: '180deg' }] }} />
                            </View>
                        </GlassContainer>
                    </TouchableOpacity>

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
    backBtn: {
        marginRight: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Lexend_700Bold',
    },
    content: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Lexend_700Bold',
        marginBottom: 8,
        marginLeft: 4,
        marginTop: 24,
        letterSpacing: 1,
    },
    section: {
        padding: 0,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    icon: {
        marginRight: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lexend_500Medium',
    },
    inputRight: {
        fontSize: 18,
        fontFamily: 'Lexend_700Bold',
        textAlign: 'right',
        minWidth: 80,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Lexend_500Medium',
    },
    subLabel: {
        fontSize: 12,
        fontFamily: 'Lexend_400Regular',
        marginTop: 2,
    },
    divider: {
        height: 1,
        marginLeft: 52,
    }
});
