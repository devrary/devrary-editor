import React from 'react';
import { ImageInsertionPayload } from '@/components/lexical/nodes/imageInsertionNode';

const ImageInsertionComponent = ({
  altText,
  caption,
  height = 'inherit',
  key,
  maxWidth,
  showCaption,
  src,
  width = 'inherit',
  captionsEnabled,
}: ImageInsertionPayload) => {
  return <div>ImageInsertionComponent</div>;
};

export default ImageInsertionComponent;
