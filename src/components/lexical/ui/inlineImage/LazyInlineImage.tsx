import { useSuspenseImage } from "@/shared/hooks/useSuspenseImage";
import React from "react";
import { Position } from "@/components/lexical/nodes/inlineImageNode";
import { INLINE_IMAGE_CACHE } from "@/shared/constants/cache";
import Image from "next/image";
import styles from "@/components/lexical/ui/inlineImage/LazyInlineImage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {
  altText: string;
  className: string | null;
  height: "inherit" | number;
  imageRef: { current: null | HTMLImageElement };
  src: string;
  width: "inherit" | number;
  position: Position;
};

const LazyInlineImage = ({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  position,
}: Props) => {
  useSuspenseImage(src, INLINE_IMAGE_CACHE);

  if (typeof width === "number" && typeof height === "number") {
    return (
      <Image
        src={src}
        alt={altText}
        ref={imageRef}
        style={{
          height,
          width,
        }}
        data-position={position}
        draggable="false"
        priority
        quality={100}
        width={width}
        height={height}
        className={cx("image", className)}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        width,
      }}
      data-position={position}
      draggable="false"
      priority
      quality={100}
      fill
      sizes="100%"
      className={cx("image", className)}
    />
  );
};

export default LazyInlineImage;
