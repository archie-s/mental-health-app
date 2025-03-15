import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { theme } from '../../theme/theme';

export const MindfulnessExercise = () => {
    const [isBreathing, setIsBreathing] = useState(false);
    let breathAnimation;
    breathAnimation = new Animated.Value(1);
    let opacityAnimation;

    opacityAnimation = new Animated.Value(0.7);

    useEffect(() => {
      let animationLoop: Animated.CompositeAnimation;

      if (isBreathing) {
        animationLoop = Animated.loop(
          Animated.parallel([
            Animated.sequence([
              Animated.timing(breathAnimation, {
                toValue: 1.5,
                duration: 4000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(breathAnimation, {
                toValue: 1,
                duration: 4000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(opacityAnimation, {
                toValue: 1,
                duration: 4000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(opacityAnimation, {
                toValue: 0.7,
                duration: 4000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
          ])
        );
        animationLoop.start();
      }

      return () => {
        if (animationLoop) {
          animationLoop.stop();
        }
      };
    }, [breathAnimation, isBreathing, opacityAnimation]);

    const toggleBreathing = () => {
      setIsBreathing(!isBreathing);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1} adjustsFontSizeToFit>
          Mindful Breathing
        </Text>
        <View style={styles.exerciseContainer}>
          <Animated.View
            style={[
              styles.breathCircle,
              {
                transform: [
                  {
                    scale: breathAnimation,
                  },
                ],
                opacity: opacityAnimation,
              },
            ]}
          />
          <Text style={styles.instruction}>
            {isBreathing ? 'Breathe in... Breathe out...' : 'Tap to begin'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, isBreathing && styles.stopButton]}
          onPress={toggleBreathing}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isBreathing ? 'Stop' : 'Start Breathing Exercise'}
          </Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  exerciseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  breathCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  instruction: {
    ...theme.typography.body1,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  stopButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    ...theme.typography.body1,
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
});
