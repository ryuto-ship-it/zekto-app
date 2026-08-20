import React from 'react';
import Svg, { Circle, Path, Rect, Line } from 'react-native-svg';

type IconProps = { size?: number; color?: string; strokeWidth?: number };

export function DiscoverIcon({ size = 22, color = '#8B978F', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M15 9l-2 5-5 2 2-5z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </Svg>
  );
}

export function WalletIcon({ size = 22, color = '#8B978F', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={6} width={18} height={13} rx={2} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M3 10h18M7 15h3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function MapIcon({ size = 22, color = '#8B978F', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Circle cx={12} cy={10} r={2.4} stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function ProfileIcon({ size = 22, color = '#8B978F', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={3.6} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M4.5 20c1.6-3.8 5-5.6 7.5-5.6s5.9 1.8 7.5 5.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 16, color = '#4A554E', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={strokeWidth} />
      <Line x1={21} y1={21} x2={16.4} y2={16.4} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function StarIcon({ size = 12, color = '#B8923F' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.8L12 17.8l-6.1 3.3 1.5-6.8-5.2-4.7 6.9-.7z" />
    </Svg>
  );
}

export function PinIcon({ size = 14, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" fill={color} />
    </Svg>
  );
}

export function CloseIcon({ size = 14, color = '#16211F', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 5l14 14M19 5L5 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function ChevronRight({ size = 14, color = '#4A554E', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 5l7 7-7 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function BeautyIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2v6M9 5h6M7 10c0 5 2 8 5 12 3-4 5-7 5-12a5 5 0 0 0-10 0z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function HotelIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 20V7a1 1 0 0 1 1-1h4v14M12 20V11h9v9M3 14h18M6 9h1M9 9h1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function DiningIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 2v8a2 2 0 0 0 4 0V2M8 10v12M18 2c-2 1-3 3-3 6s1 4 3 5v9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ShoppingIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 8V6a3 3 0 0 1 6 0v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ShowIcon({ size = 20, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M14 6.5v2M14 11v2M14 15.5v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function CategoryIcon({ cat, ...rest }: IconProps & { cat: 'beauty' | 'hotel' | 'dining' | 'shopping' | 'show' }) {
  if (cat === 'beauty') return <BeautyIcon {...rest} />;
  if (cat === 'hotel') return <HotelIcon {...rest} />;
  if (cat === 'shopping') return <ShoppingIcon {...rest} />;
  if (cat === 'show') return <ShowIcon {...rest} />;
  return <DiningIcon {...rest} />;
}

export function GlobeIcon({ size = 15, color = '#6C3FC5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9s1.3-6.5 3.8-9z" stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

export function BellIcon({ size = 15, color = '#6C3FC5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M10 19a2 2 0 0 0 4 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function LockIcon({ size = 15, color = '#6C3FC5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={5} y={10} width={14} height={10} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

export function ChatIcon({ size = 15, color = '#6C3FC5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 5h16v11H8l-4 4z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
}

export function DocIcon({ size = 15, color = '#6C3FC5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 3h9l3 3v15H6z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M9 12h6M9 16h6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function CardPaymentIcon({ size = 14, color = '#C9D6CE' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={2.5} y={5} width={19} height={14} rx={2.5} stroke={color} strokeWidth={1.8} />
      <Path d="M2.5 9.5h19" stroke={color} strokeWidth={1.8} />
      <Path d="M6 15h4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function CashPaymentIcon({ size = 14, color = '#C9D6CE' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={6} width={20} height={12} rx={2} stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

export function CoinPaymentIcon({ size = 14, color = '#F0B429' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M12 7v10M9.5 9.3c0-1.3 1.1-2.1 2.5-2.1s2.5.8 2.5 1.9-1 1.6-2.5 1.9-2.5.9-2.5 2 1.1 1.9 2.5 1.9 2.5-.7 2.5-1.9" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}
