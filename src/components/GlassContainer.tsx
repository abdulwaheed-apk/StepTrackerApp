import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/colors';

interface GlassContainerProps {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    intensity?: number;
    theme: 'light' | 'dark';
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
    children,
    style,
    intensity = 30,
    theme
}) => {
    const isDark = theme === 'dark';
    const glassColor = isDark ? COLORS.dark.glass : COLORS.light.glass;
    const listBorderColor = isDark ? COLORS.dark.glassBorder : COLORS.light.glassBorder;

    return (
        <View style={[
            styles.container,
            {
                borderColor: listBorderColor,
                backgroundColor: glassColor // Fallback or tint
            },
            style
        ]}>
            <BlurView
                intensity={intensity}
                tint={isDark ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}
            />

            {/* 
          Note: On Android, BlurView might just be a semi-transparent view if not supported well, 
          but expo-blur works decently on modern Android. 
          The 'backgroundColor' on the parent View helps provide the "tint" color.
      */}
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1, // Subtle border back for separation in light mode
        // No shadows
    },
});
