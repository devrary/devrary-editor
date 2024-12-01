import React from 'react';
import type { NodeKey } from 'lexical';

type Props = {
  data: string;
  display: 'embed' | 'mark';
  width?: number | 'inherit';
  height?: number | 'inherit';
  nodeKey: NodeKey;
};

const MultiLinkComponent = ({
  data,
  display,
  width,
  height,
  nodeKey,
}: Props) => {
  return <div>MultiLinkComponent</div>;
};

export default MultiLinkComponent;
