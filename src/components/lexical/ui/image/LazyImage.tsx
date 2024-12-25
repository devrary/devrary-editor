import { IMAGE_CACHE } from '@/shared/constants/cache';
import { useSuspenseImage } from '@/shared/hooks/useSuspenseImage';
import Image from 'next/image';
import React from 'react';
import styles from '@/components/lexical/ui/image/LazyImage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  altText: string;
  height: 'inherit' | number;
  imageRef: { current: null | HTMLImageElement };
  maxWidth: number;
  src: string;
  width: 'inherit' | number;
  onError: () => void;
  className: string | null;
};

const LazyImage = ({
  altText,
  imageRef,
  src,
  width,
  height,
  maxWidth,
  onError,
  className,
}: Props) => {
  useSuspenseImage(src, IMAGE_CACHE);
  if (typeof width === 'number' && typeof height === 'number') {
    return (
      <Image
        src={src}
        alt={altText}
        ref={imageRef}
        onError={onError}
        draggable="false"
        priority
        quality={100}
        width={width}
        height={height}
        className={cx('lexical-image', className)}
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
        maxWidth,
        width,
      }}
      onError={onError}
      draggable="false"
      priority
      quality={100}
      fill
      sizes="100%"
      className={cx('image', className)}
    />
  );
};

export default LazyImage;
