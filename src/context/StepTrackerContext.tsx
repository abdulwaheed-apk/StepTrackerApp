import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StepTrackerContextType {
    pedometerAvailable: 'checking' | 'yes' | 'no';
    dailySteps: number;
    target: number;
    history: Record<string, number>;
    updateTarget: (n: number) => void;
    calories: number;
    distance: number;
    duration: number;
    streak: number;
}

const StepTrackerContext = createContext<StepTrackerContextType>({} as any);

export const StepTrackerProvider = ({ children }: { children: ReactNode }) => {
    const [pedometerAvailable, setPedometerAvailable] = useState<'checking' | 'yes' | 'no'>('checking');
    const [dailySteps, setDailySteps] = useState(0);
    const [target, setTarget] = useState(10000);
    const [history, setHistory] = useState<Record<string, number>>({});

    useEffect(() => {
        checkPedometer();
        loadSavedData();
    }, []);

    useEffect(() => {
        if (pedometerAvailable !== 'yes') return;
        let sub: any;
        (async () => {
            const steps = await loadTodaySteps();
            setDailySteps(steps);
            sub = Pedometer.watchStepCount(result => {
                setDailySteps(prev => {
                    const updated = prev + result.steps;
                    saveTodayHistory(updated);
                    return updated;
                });
            });
        })();
        return () => sub && sub.remove();
    }, [pedometerAvailable]);

    const checkPedometer = async () => {
        const available = await Pedometer.isAvailableAsync();
        setPedometerAvailable(available ? 'yes' : 'no');
    };

    const loadTodaySteps = async () => {
        try {
            const now = new Date();
            const start = new Date();
            start.setHours(0, 0, 0, 0);
            const { steps } = await Pedometer.getStepCountAsync(start, now);
            return steps;
        } catch { return 0; }
    };

    const loadSavedData = async () => {
        try {
            const [t, h] = await Promise.all([
                AsyncStorage.getItem('dailyTarget'),
                AsyncStorage.getItem('stepHistory')
            ]);
            if (t) setTarget(parseInt(t));
            if (h) setHistory(JSON.parse(h));
        } catch { }
    };

    const saveTodayHistory = async (steps: number) => {
        const key = new Date().toISOString().split('T')[0];
        setHistory(prev => {
            const updated = { ...prev, [key]: steps };
            AsyncStorage.setItem('stepHistory', JSON.stringify(updated)).catch(() => { });
            return updated;
        });
    };

    const updateTarget = async (newTarget: number) => {
        setTarget(newTarget);
        await AsyncStorage.setItem('dailyTarget', newTarget.toString());
    };

    // Derived Stats
    const distance = (dailySteps * 0.762) / 1000; // Approx 0.762m stride
    const calories = dailySteps * 0.04; // Approx 0.04 cal/step
    const duration = dailySteps / 100; // Estimate

    // Calculate Streak
    const calculateStreak = () => {
        const sorted = Object.keys(history).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        let current = 0;
        const todayKey = new Date().toISOString().split('T')[0];

        // If today matches target, start with 1, else check history
        if (dailySteps >= target) {
            // Current streak logic handled by scanning history + today state
            // But history usually updates on change.
        }

        for (const date of sorted) {
            if (history[date] >= target) current++;
            else if (date !== todayKey) break;
        }
        return current;
    };
    const streak = calculateStreak();

    return (
        <StepTrackerContext.Provider value={{
            pedometerAvailable, dailySteps, target, history, updateTarget,
            calories, distance, duration, streak
        }}>
            {children}
        </StepTrackerContext.Provider>
    );
};

export const useStepTracker = () => useContext(StepTrackerContext);
