export const COLORS = {
    light: {
        // Pure, clean gradients - almost white but with breath
        background: ['#FFFFFF', '#F2F2F7'] as const,
        // Very subtle glass
        glass: 'rgba(255, 255, 255, 0.6)',
        glassBorder: 'rgba(0, 0, 0, 0.02)', // Barely there
        text: '#000000',
        subText: '#8E8E93', // iOS System Gray
        accent: '#007AFF', // iOS Blue
        secondary: '#FFFFFF',
        icon: '#8E8E93',
    },
    dark: {
        // deep black OLED
        background: ['#000000', '#000000'] as const,
        glass: 'rgba(28, 28, 30, 0.6)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
        text: '#FFFFFF',
        subText: '#98989D',
        accent: '#0A84FF',
        secondary: 'rgba(255,255,255,0.05)',
        icon: '#8E8E93',
    },
};
