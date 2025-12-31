import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
    firstName: string;
    lastName: string;
    weight: string; // Storing as string for input ease
}

export const useUserProfile = () => {
    const [user, setUser] = useState<UserProfile>({
        firstName: '',
        lastName: '',
        weight: ''
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const stored = await AsyncStorage.getItem('userProfile');
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch { }
    };

    const updateUser = async (updates: Partial<UserProfile>) => {
        const newUser = { ...user, ...updates };
        setUser(newUser);
        await AsyncStorage.setItem('userProfile', JSON.stringify(newUser));
    };

    return { user, updateUser, refreshUser: loadUser };
};
