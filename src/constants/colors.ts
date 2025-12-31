export const PALETTE = {
    // Base Colors
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',

    // Functional Colors
    primaryBlue: '#007AFF', // iOS Blue
    primaryBlueDark: '#0A84FF',

    success: '#10B981', // Emerald 500
    warning: '#F59E0B', // Amber 500
    error: '#EF4444',   // Red 500
    info: '#3B82F6',    // Blue 500

    // Neutrals
    gray100: '#F2F2F7', // iOS System Gray 6
    gray200: '#E5E5EA',
    gray300: '#D1D1D6',
    gray400: '#C7C7CC',
    gray500: '#AEAEB2',
    gray600: '#8E8E93', // iOS System Gray
    gray700: '#98989D',
    gray800: '#1C1C1E',
    gray900: '#000000',

    // Specific UI Colors
    amber100: '#FEF3C7',
    amber300: '#FCD34D',
    amber700: '#D97706',
};

export const COLORS = {
    light: {
        // Core
        background: [PALETTE.white, PALETTE.gray100] as const,
        text: PALETTE.black,
        subText: PALETTE.gray600,
        accent: PALETTE.primaryBlue,
        secondary: PALETTE.white,
        icon: PALETTE.gray600,

        // Glass
        glass: 'rgba(255, 255, 255, 0.6)',
        glassBorder: 'rgba(0, 0, 0, 0.02)',

        // Semantic
        success: PALETTE.success,
        warning: PALETTE.warning,
        error: PALETTE.error,
        info: PALETTE.info,

        // Component Specific
        streakBackground: PALETTE.amber100,
        streakText: PALETTE.amber700,
        streakBorder: PALETTE.primaryBlue, // Used in Header as borderColor: colors.accent currently, but can differ

        chartTrack: 'rgba(0,0,0,0.05)',
        chartFill: PALETTE.success,
        chartInactive: 'rgba(0,0,0,0.1)',
    },
    dark: {
        // Core
        background: [PALETTE.black, PALETTE.black] as const,
        text: PALETTE.white,
        subText: PALETTE.gray700,
        accent: PALETTE.primaryBlueDark,
        secondary: 'rgba(255,255,255,0.05)',
        icon: PALETTE.gray600,

        // Glass
        glass: 'rgba(28, 28, 30, 0.6)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',

        // Semantic
        success: PALETTE.success,
        warning: PALETTE.warning,
        error: PALETTE.error,
        info: PALETTE.info,

        // Component Specific
        streakBackground: 'rgba(255,165,0,0.2)',
        streakText: PALETTE.amber300,
        streakBorder: PALETTE.primaryBlueDark,

        chartTrack: 'rgba(255,255,255,0.1)',
        chartFill: PALETTE.success,
        chartInactive: 'rgba(255,255,255,0.2)',
    },
};
