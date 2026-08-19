import React, { ReactNode } from 'react';
import { View, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '../theme/theme';
import { CloseIcon } from './Icons';

export default function Sheet({
  children,
  footer,
  onClose,
  scroll = true,
}: {
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  scroll?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const Content = scroll ? ScrollView : View;
  const contentProps = scroll
    ? { contentContainerStyle: { paddingBottom: 24 }, showsVerticalScrollIndicator: false }
    : {};

  return (
    <View style={styles.root}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={10}>
          <CloseIcon size={13} />
        </Pressable>
        <View style={styles.handle} />
        <Content style={styles.content} {...contentProps}>
          {children}
        </Content>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: colors.overlay },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '90%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xxl,
    borderTopRightRadius: radii.xxl,
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  handle: { width: 36, height: 4, backgroundColor: colors.line, borderRadius: 4, alignSelf: 'center', marginTop: 10, marginBottom: 4 },
  content: { flexGrow: 0 },
  footer: { paddingHorizontal: 20, paddingTop: 12, flexDirection: 'row', gap: 10, alignItems: 'center' },
});
