import { StyleSheet } from 'react-native';
// Note: We don't import COLORS here directly if we want dynamic themes, 
// but for typography (font family, size, weight) it's static.
// For dynamic color integration, we usually use these as base styles to be spread or combined.

export const FONTS = {
    regular: 'Lexend_400Regular',
    medium: 'Lexend_500Medium',
    semiBold: 'Lexend_600SemiBold',
    bold: 'Lexend_700Bold',
    extraBold: 'Lexend_800ExtraBold',
};

export const GLOBAL_STYLES = StyleSheet.create({
    // Typography
    display: {
        fontFamily: FONTS.extraBold,
        fontSize: 36,
        letterSpacing: -1,
    },
    h1: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        letterSpacing: 0,
    },
    h2: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        letterSpacing: 0.5,
    },
    h3: {
        fontFamily: FONTS.semiBold,
        fontSize: 16,
    },
    body: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        lineHeight: 20,
    },
    caption: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },

    // Layout
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    padScreen: {
        padding: 24,
    },
});
