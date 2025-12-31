import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import { Target, Edit2, Check } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { GlassContainer } from './GlassContainer';

interface GoalInputProps {
    target: number;
    onUpdateTarget: (newTarget: number) => void;
    theme: 'light' | 'dark';
}

export const GoalInput: React.FC<GoalInputProps> = ({ target, onUpdateTarget, theme }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(target.toString());

    const isDark = theme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    useEffect(() => {
        setTempValue(target.toString());
    }, [target]);

    const handleSave = () => {
        const val = parseInt(tempValue, 10);
        if (!isNaN(val) && val > 0) {
            onUpdateTarget(val);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setIsEditing(false);
        }
    };

    return (
        <GlassContainer theme={theme} style={styles.container}>
            <View style={styles.row}>
                <View style={styles.left}>
                    <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(37, 99, 235, 0.1)' }]}>
                        <Target size={22} color={colors.accent} />
                    </View>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, { color: colors.text, borderBottomColor: colors.accent }]}
                            value={tempValue}
                            onChangeText={setTempValue}
                            keyboardType="numeric"
                            autoFocus
                            placeholder="10000"
                            placeholderTextColor={colors.subText}
                        />
                    ) : (
                        <View>
                            <Text style={[styles.label, { color: colors.subText }]}>Daily Goal</Text>
                            <Text style={[styles.value, { color: colors.text }]}>{target.toLocaleString()}</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    onPress={isEditing ? handleSave : () => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setIsEditing(true);
                    }}
                    style={[styles.actionBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6' }]}
                >
                    {isEditing ? (
                        <Check size={20} color={colors.accent} />
                    ) : (
                        <Edit2 size={18} color={colors.subText} />
                    )}
                </TouchableOpacity>
            </View>
        </GlassContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 2,
        opacity: 0.8,
    },
    value: {
        fontSize: 18,
        fontWeight: '700',
    },
    input: {
        fontSize: 18,
        fontWeight: '700',
        minWidth: 100,
        borderBottomWidth: 2,
        paddingVertical: 4,
    },
    actionBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
