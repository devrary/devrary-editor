import { Position } from "@/shared/types/ui/position";

export function positionSticky(
  stickyElem: HTMLElement,
  positioning: Position
): void {
  const style = stickyElem.style;
  const rootElementRect = positioning.rootElementRect;
  const rectLeft = rootElementRect !== null ? rootElementRect.left : 0;
  const rectTop = rootElementRect !== null ? rootElementRect.top : 0;
  style.top = rectTop + positioning.y + "px";
  style.left = rectLeft + positioning.x + "px";
}
