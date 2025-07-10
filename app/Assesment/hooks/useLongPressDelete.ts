import { useRef } from "react";

export function useLongPressDelete(callback: () => void, delay = 600) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onTouchStart = () => {
    timerRef.current = setTimeout(() => callback(), delay);
  };
  const onTouchEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  return { onTouchStart, onTouchEnd };
}
