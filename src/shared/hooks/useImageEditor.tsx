import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  MouseEvent,
  WheelEvent,
} from 'react';

type Props = {
  source: string | ArrayBuffer | Blob | null;
};

export const useImageEditor = ({ source }: Props) => {
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let isResizing = false;
  let startX = 0;
  let startY = 0;

  const imageRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(new Image());

  const renderImage = () => {
    const image = imageRef.current;
    const ctx = image?.getContext('2d');

    if (ctx && img) {
      ctx?.clearRect(0, 0, image?.width as number, image?.height as number);
      ctx?.drawImage(
        img,
        offsetX,
        offsetY,
        img.width * scale,
        img.height * scale
      );
    }
  };

  useLayoutEffect(() => {
    if (img && source) {
      img.src = source as string;
      img.onload = () => {
        renderImage();
      };
    }
  }, [source]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    isDragging = true;
    startX = e.nativeEvent.offsetX - offsetX;
    startY = e.nativeEvent.offsetY - offsetY;
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      offsetX = e.nativeEvent.offsetX - startX;
      offsetY = e.nativeEvent.offsetY - startY;
      renderImage();
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
  };

  const handleMouseWheel = (e: WheelEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    const zoomFactor = 0.1;
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    if (e.nativeEvent.deltaY < 0) {
      scale *= 1 + zoomFactor;
    } else {
      scale *= 1 - zoomFactor;
    }

    offsetX -= (mouseX - offsetX) * zoomFactor * (e.deltaY < 0 ? 1 : -1);
    offsetY -= (mouseY - offsetY) * zoomFactor * (e.deltaY < 0 ? 1 : -1);

    renderImage();
  };

  return {
    image: imageRef,
    mouseDown: handleMouseDown,
    mouseMove: handleMouseMove,
    mouseUp: handleMouseUp,
    mouseWheel: handleMouseWheel,
  };
};
