import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Animated, Easing, PanResponder, LayoutChangeEvent, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows } from '../theme/theme';

export type HeroSlide = {
  key: string;
  gradient: [string, string];
  eyebrow: string;
  title: string;
  caption: string;
  icon: string;
};

const AUTOPLAY_MS = 4500;
const RESUME_DELAY_MS = 6000;
const SWIPE_THRESHOLD = 0.2;

export const HERO_SLIDES: HeroSlide[] = [
  {
    key: 'curated',
    gradient: [colors.primary, colors.primaryLight],
    eyebrow: 'CURATED FOR YOUR TRIP',
    title: 'Korea, curated. Book the best clinics, stays, and tables before you land.',
    caption: "Pay however's easiest — card, cash, or stablecoin. What we care about first is what you want to do in Korea.",
    icon: '🧭',
  },
  {
    key: 'beauty',
    gradient: [colors.coral, colors.coralEnd],
    eyebrow: 'BEAUTY & MEDICAL',
    title: "Skip the wait. Book Seoul's top clinics before you land.",
    caption: 'Verified clinics in Gangnam, Apgujeong, and Cheongdam — reserved before you touch down.',
    icon: '✨',
  },
  {
    key: 'hotel',
    gradient: [colors.teal, colors.tealEnd],
    eyebrow: 'HOTELS & STAYS',
    title: 'Your room, guaranteed. Prepay and skip check-in stress.',
    caption: 'Lock in your rate in Myeongdong, Gangnam, or Itaewon — no surprises at the front desk.',
    icon: '🛏️',
  },
  {
    key: 'rewards',
    gradient: [colors.gold, colors.goldLight],
    eyebrow: 'FUTUREPASS POINTS',
    title: 'Pay with stablecoin, earn FuturePass Points on every booking.',
    caption: 'Up to 4% back for Platinum members — redeemable toward your next trip.',
    icon: '🪙',
  },
];

function FloatingBlob({ style, phase = 0 }: { style: any; phase?: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 3400 + phase * 400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 3400 + phase * 400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, phase]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return <Animated.View style={[style, { transform: [{ translateY }, { scale }] }]} />;
}

function FloatingIcon({ emoji }: { emoji: string }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -7] });
  const rotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['-4deg', '4deg'] });

  return (
    <Animated.Text style={[styles.floatingIcon, { transform: [{ translateY }, { rotate }] }]}>
      {emoji}
    </Animated.Text>
  );
}

function SlideCard({ slide, width, active }: { slide: HeroSlide; width: number; active: boolean }) {
  const eyebrowAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const captionAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return;
    eyebrowAnim.setValue(0);
    titleAnim.setValue(0);
    captionAnim.setValue(0);
    Animated.stagger(110, [
      Animated.timing(eyebrowAnim, { toValue: 1, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(titleAnim, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(captionAnim, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [active, eyebrowAnim, titleAnim, captionAnim]);

  const fadeUp = (v: Animated.Value) => ({
    opacity: v,
    transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
  });

  return (
    <LinearGradient
      colors={slide.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.slide, { width: width || undefined }]}
    >
      <FloatingBlob style={[styles.blob, styles.blobBig]} phase={0} />
      <FloatingBlob style={[styles.blob, styles.blobSmall]} phase={1} />
      <FloatingIcon emoji={slide.icon} />
      <Animated.Text style={[styles.eyebrow, fadeUp(eyebrowAnim)]}>{slide.eyebrow}</Animated.Text>
      <Animated.Text style={[styles.title, fadeUp(titleAnim)]} numberOfLines={3}>
        {slide.title}
      </Animated.Text>
      <Animated.Text style={[styles.caption, fadeUp(captionAnim)]} numberOfLines={2}>
        {slide.caption}
      </Animated.Text>
    </LinearGradient>
  );
}

export default function HeroCarousel({ slides = HERO_SLIDES }: { slides?: HeroSlide[] }) {
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const indexRef = useRef(0);
  const widthRef = useRef(0);
  const baseOffsetRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w && w !== widthRef.current) {
      widthRef.current = w;
      setWidth(w);
      translateX.setValue(-indexRef.current * w);
    }
  };

  const goTo = (nextIndex: number, animated = true) => {
    const clamped = ((nextIndex % slides.length) + slides.length) % slides.length;
    indexRef.current = clamped;
    setIndex(clamped);
    if (animated) {
      Animated.spring(translateX, { toValue: -clamped * widthRef.current, useNativeDriver: false, bounciness: 6, speed: 14 }).start();
    } else {
      translateX.setValue(-clamped * widthRef.current);
    }
  };

  const pauseThenResume = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderGrant: () => {
          pauseThenResume();
          baseOffsetRef.current = (translateX as any).__getValue();
        },
        onPanResponderMove: (_, g) => {
          translateX.setValue(baseOffsetRef.current + g.dx);
        },
        onPanResponderRelease: (_, g) => {
          const threshold = widthRef.current * SWIPE_THRESHOLD;
          if (g.dx < -threshold) goTo(indexRef.current + 1);
          else if (g.dx > threshold) goTo(indexRef.current - 1);
          else goTo(indexRef.current);
          pauseThenResume();
        },
        onPanResponderTerminate: () => {
          goTo(indexRef.current);
          pauseThenResume();
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <View style={styles.wrap} onLayout={onLayout}>
      <View style={styles.clip} {...panResponder.panHandlers}>
        {width > 0 ? (
          <Animated.View style={[styles.track, { width: width * slides.length, transform: [{ translateX }] }]}>
            {slides.map((slide, i) => (
              <SlideCard key={slide.key} slide={slide} width={width} active={i === index} />
            ))}
          </Animated.View>
        ) : null}
      </View>
      <View style={styles.dotsRow}>
        {slides.map((slide, i) => (
          <View
            key={slide.key}
            onTouchEnd={() => {
              goTo(i);
              pauseThenResume();
            }}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginHorizontal: 20, marginBottom: 6, borderRadius: radii.xxl, overflow: 'hidden', ...shadows.cardLarge },
  clip: { overflow: 'hidden', cursor: 'grab', userSelect: 'none' } as any,
  track: { flexDirection: 'row' },
  slide: { padding: 20, paddingTop: 22, paddingBottom: 36, height: 224, position: 'relative', overflow: 'hidden', userSelect: 'none' } as any,
  blob: { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.14)' },
  blobBig: { width: 200, height: 200, top: -80, right: -60 },
  blobSmall: { width: 110, height: 110, top: 30, right: 40 },
  floatingIcon: { position: 'absolute', bottom: 16, right: 20, fontSize: 34, opacity: 0.55 },
  eyebrow: { fontFamily: fonts.monoMedium, fontSize: 10.5, letterSpacing: 1.4, color: 'rgba(255,255,255,0.85)' },
  title: { fontFamily: fonts.serifBold, fontSize: 23, lineHeight: 27, color: colors.white, marginTop: 9, marginBottom: 10, maxWidth: '76%' },
  caption: { fontSize: 10.5, lineHeight: 14.5, color: 'rgba(255,255,255,0.85)', marginTop: 2, fontFamily: fonts.sans, maxWidth: '80%' },
  dotsRow: {
    position: 'absolute', bottom: 12, left: 20, flexDirection: 'row', gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { width: 16, backgroundColor: colors.white },
});
