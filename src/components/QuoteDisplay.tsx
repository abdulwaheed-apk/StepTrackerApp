import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote as QuoteIcon } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { GlassContainer } from './GlassContainer';

const QUOTES = [
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "Movement is a medicine for creating change in a person's physical, emotional, and mental states.", author: "Carol Welch" },
    { text: "Walking is man's best medicine.", author: "Hippocrates" },
    { text: "Fitness is not about being better than someone else. It’s about being better than you were yesterday.", author: "Khloe Kardashian" }
];

interface QuoteDisplayProps {
    theme: 'light' | 'dark';
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ theme }) => {
    const [quote, setQuote] = useState(QUOTES[0]);
    const isDark = theme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    useEffect(() => {
        loadQuote();
    }, []);

    const loadQuote = async () => {
        try {
            const lastUpdate = await AsyncStorage.getItem('quoteLastUpdate');
            const lastIndex = await AsyncStorage.getItem('quoteIndex');

            const now = Date.now();
            const oneHour = 60 * 60 * 1000;

            if (lastUpdate && lastIndex && (now - parseInt(lastUpdate)) < oneHour) {
                // Less than an hour, keep same quote
                setQuote(QUOTES[parseInt(lastIndex)]);
            } else {
                // New quote
                const nextIndex = lastIndex ? (parseInt(lastIndex) + 1) % QUOTES.length : 0; // Cycle through
                // Or random? user said "refresh after each hour", random is fun but cycling ensures variety.
                // Let's do random for more fun.
                const randIndex = Math.floor(Math.random() * QUOTES.length);

                setQuote(QUOTES[randIndex]);
                await AsyncStorage.multiSet([
                    ['quoteLastUpdate', now.toString()],
                    ['quoteIndex', randIndex.toString()]
                ]);
            }
        } catch { }
    };

    return (
        <GlassContainer theme={theme} style={styles.container}>
            <View style={styles.content}>
                <View style={[styles.quoteBorder, { backgroundColor: colors.accent }]} />
                <View style={styles.textWrapper}>
                    <Text style={[styles.text, { color: colors.text }]}>
                        {quote.text}
                    </Text>
                    <Text style={[styles.author, { color: colors.subText }]}>
                        {quote.author}
                    </Text>
                </View>
            </View>
        </GlassContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
        marginTop: 20,
        overflow: 'hidden',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    quoteBorder: {
        width: 4,
        height: '100%',
        borderRadius: 2,
        marginRight: 16,
    },
    textWrapper: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontStyle: 'italic',
        fontFamily: 'Lexend_500Medium',
        lineHeight: 24,
    },
    author: {
        marginTop: 6,
        fontSize: 12,
        fontFamily: 'Lexend_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    }
});
