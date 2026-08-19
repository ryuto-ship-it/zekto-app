export const colors = {
  ink: '#16211F',
  inkSoft: '#4A554E',
  paper: '#F7F8F3',
  surface: '#FFFFFF',
  white: '#FFFFFF',
  jade: '#2F6B5A',
  jadeDeep: '#1F4B3F',
  jadeTint: '#DCE9E1',
  coral: '#FF5A7A',
  coralTint: '#FFE1E9',
  teal: '#0891A8',
  tealTint: '#DAF1F4',
  gold: '#E8A93B',
  goldTint: '#FBEDD3',
  goldLight: '#F5D98A',
  line: '#E3E6DC',
  fadedGreen: '#8FA79B',
  mutedSage: '#6C8479',
  overlay: 'rgba(15,20,18,0.45)',
};

export const fonts = {
  serif: 'Fraunces_600SemiBold',
  serifBold: 'Fraunces_700Bold',
  serifMedium: 'Fraunces_500Medium',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
  sansExtraBold: 'Inter_800ExtraBold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
  monoSemiBold: 'IBMPlexMono_600SemiBold',
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// Category accent system — each category gets its own vivid color instead of
// everything sharing the brand green. The brand green (jade/jadeDeep) is kept
// for primary CTAs, nav, and the balance chip only.
export const categoryColors: Record<string, [string, string]> = {
  beauty: ['#FFB3C6', '#FF5A7A'],
  hotel: ['#7DD3DE', '#0891A8'],
  dining: ['#F5D98A', '#E8A93B'],
};

export const categoryAccents: Record<string, string> = {
  beauty: colors.coral,
  hotel: colors.teal,
  dining: colors.gold,
};

export const categoryAccentTints: Record<string, string> = {
  beauty: colors.coralTint,
  hotel: colors.tealTint,
  dining: colors.goldTint,
};

export const categoryLabels: Record<string, string> = {
  beauty: 'Beauty & Medical',
  hotel: 'Hotels',
  dining: 'Dining',
};

// Shared card-depth shadow presets. Deliberately much stronger than a subtle
// "flat design" shadow so cards read as physically lifted off the background.
export const shadows = {
  card: {
    shadowColor: '#16211F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 7,
  },
  cardLarge: {
    shadowColor: '#16211F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  floating: {
    shadowColor: '#16211F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
};
