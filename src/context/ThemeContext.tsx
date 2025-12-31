import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'system' | 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    resolvedTheme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    resolvedTheme: 'light',
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeMode>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    // Load initial theme
    useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem('appTheme');
            if (stored) setTheme(stored as ThemeMode);
        })();
    }, []);

    // Resolve valid theme
    useEffect(() => {
        if (theme === 'system') {
            setResolvedTheme(systemScheme === 'dark' ? 'dark' : 'light');
        } else {
            setResolvedTheme(theme);
        }
    }, [theme, systemScheme]);

    const toggleTheme = async () => {
        const nextMode = resolvedTheme === 'light' ? 'dark' : 'light';
        setTheme(nextMode);
        await AsyncStorage.setItem('appTheme', nextMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
