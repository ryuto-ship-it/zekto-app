export const colors = {
  ink: '#16211F',
  inkSoft: '#4A554E',
  paper: '#F7F8F3',
  surface: '#FFFFFF',
  white: '#FFFFFF',
  line: '#E3E6DC',
  overlay: 'rgba(15,20,18,0.45)',

  // Brand primary — a deliberately bold single signature color (Kurly-style),
  // used for the logo, primary CTAs, selected tab/chip states, and progress
  // emphasis. The old dark green (#1F4B3F) is fully retired — do not reuse it.
  primary: '#6C3FC5',
  primaryLight: '#9B6FE8',
  primaryTint: '#F3EEFC',

  // Category accents — each category gets its own two-stop gradient, plus a
  // flat "start" color for places that only need one solid tint (labels,
  // icons, thin badges).
  coral: '#FF3B7F',
  coralEnd: '#FF7A5C',
  coralTint: '#FFE3EC',

  teal: '#0EA5A8',
  tealEnd: '#38BDF8',
  tealTint: '#E3F6FB',

  amber: '#F5A623',
  amberEnd: '#FF6B4A',
  amberTint: '#FFF0DE',

  // Currency / stablecoin gold — independent of the category colors above,
  // used only for the balance chip and anything asset/coin-related (the
  // price-ladder stablecoin row, the AI badge, resale price tags).
  gold: '#F0B429',
  goldLight: '#F9D976',
  goldTint: '#FDF2D9',
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

// Category accent system — each category gets its own vivid gradient instead
// of everything sharing one brand tone. Brand primary (violet) is reserved
// for CTAs/nav/logo only, never used as a category color.
export const categoryColors: Record<string, [string, string]> = {
  beauty: [colors.coral, colors.coralEnd],
  hotel: [colors.teal, colors.tealEnd],
  dining: [colors.amber, colors.amberEnd],
};

export const categoryAccents: Record<string, string> = {
  beauty: colors.coral,
  hotel: colors.teal,
  dining: colors.amber,
};

export const categoryAccentTints: Record<string, string> = {
  beauty: colors.coralTint,
  hotel: colors.tealTint,
  dining: colors.amberTint,
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
