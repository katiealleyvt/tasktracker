import { Box, Button } from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect, useRef } from "react";

export type CardAction = {
  name: string;
  bgColor: string;
  icon: ReactNode;
  action: () => void;
};
type Props = React.HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  onSwipe?: (x: number) => void;
  actions?: CardAction[];
};
export default function MobileSwiper({ children, onSwipe, ...props }: Props) {
  const wrapperRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isSwiping = useRef(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const actionsWidth = useRef(0);

  useEffect(() => {
    if (actionsRef.current) {
      actionsWidth.current = actionsRef.current.offsetWidth;
    }
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (!mainRef.current.contains(e.target as Node)) return;
    const target = e.target as HTMLElement;
    const isInteractiveElement =
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("select");

    if (!isInteractiveElement) {
      e.preventDefault();
      startX.current = e.touches[0].clientX;
      isSwiping.current = true;
    } else {
      isSwiping.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (
      !isSwiping.current ||
      !wrapperRef.current?.contains(e.target as Node) ||
      !mainRef.current
    )
      return;
    e.preventDefault();
    const moveX = e.touches[0].clientX;
    const deltaX = moveX - startX.current;

    if (deltaX < 0) {
      currentX.current = Math.max(deltaX, -actionsWidth.current);
      const card = mainRef.current;
      const actions = actionsRef.current;
      if (card && actions) {
        card.style.transform = `translateX(${currentX.current}px)`;
        // Scale the actions' visibility as you swipe
        const scale = Math.abs(currentX.current) / actionsWidth.current;
        actions.style.transform = `translateX(${100 - scale * 100}%)`;
        card.style.transition = "none";
        actions.style.transition = "none";
      }
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (
        !isSwiping.current ||
        !wrapperRef.current?.contains(e.target as Node) ||
        !mainRef.current ||
        !actionsRef.current
      )
        return;
      e.preventDefault();
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX.current;

      if (onSwipe) onSwipe(deltaX);

      const card = mainRef.current;
      const actions = actionsRef.current;
      card.style.transition = "transform 0.3s ease";
      actions.style.transition = "transform 0.3s ease";

      // If swiped past half the actions width, reveal fully
      if (Math.abs(deltaX) > actionsWidth.current / 2) {
        card.style.transform = `translateX(-${actionsWidth.current}px)`;
        actions.style.transform = "translateX(0)";
      } else {
        card.style.transform = "translateX(0)";
        actions.style.transform = "translateX(100%)";
      }

      isSwiping.current = false;
    },
    [onSwipe]
  );

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        ...props.style,
      }}
    >
      <div ref={mainRef} style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
      <div
        ref={actionsRef}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          transform: "translateX(100%)",
          width: "150px",
        }}
      >
        {props.actions?.map((action, i) => (
          <Box
            bgColor={action.bgColor}
            key={action.name}
            w="100%"
            h="100%"
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            borderTopRightRadius={
              i + 1 === props.actions?.length ? "md" : undefined
            }
            borderBottomRightRadius={
              i + 1 === props.actions?.length ? "md" : undefined
            }
            onClick={action.action}
          >
            {action.icon}
          </Box>
        ))}
      </div>
    </div>
  );
}
