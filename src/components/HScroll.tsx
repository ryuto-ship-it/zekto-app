import React, { useEffect, useRef } from 'react';
import { ScrollView, ScrollViewProps, Platform } from 'react-native';

// On native, horizontal ScrollViews already scroll fine with a finger swipe.
// On web there's no touch surface, so this adds two things a mouse user
// expects: vertical wheel scroll gets redirected to horizontal, and
// click-and-drag scrolls the row (like Twitter/Notion horizontal rails).
export default function HScroll(props: ScrollViewProps) {
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node: any = (ref.current as any)?.getScrollableNode?.();
    if (!node) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (node.scrollWidth <= node.clientWidth) return;
      node.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScrollLeft = node.scrollLeft;
      node.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      node.scrollLeft = startScrollLeft - dx;
    };
    const endDrag = () => {
      dragging = false;
      node.style.cursor = 'grab';
    };
    // A drag that actually moved the row shouldn't also fire a click on
    // whatever chip/card the cursor happened to land on.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    node.style.cursor = 'grab';
    node.addEventListener('wheel', onWheel, { passive: false });
    node.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', endDrag);
    node.addEventListener('click', onClickCapture, true);

    return () => {
      node.removeEventListener('wheel', onWheel);
      node.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      node.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return <ScrollView ref={ref} horizontal showsHorizontalScrollIndicator={false} {...props} />;
}
