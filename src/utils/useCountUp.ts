import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

// Animates the displayed number toward `value` whenever it changes, instead of
// jumping instantly — used anywhere a balance/points figure updates live.
export function useCountUp(value: number, duration = 600): number {
  const anim = useRef(new Animated.Value(value)).current;
  const [displayed, setDisplayed] = useState(value);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      anim.setValue(value);
      setDisplayed(value);
      return;
    }
    const id = anim.addListener(({ value: v }) => setDisplayed(v));
    Animated.timing(anim, { toValue: value, duration, useNativeDriver: false }).start();
    return () => anim.removeListener(id);
  }, [value, duration, anim]);

  return displayed;
}
