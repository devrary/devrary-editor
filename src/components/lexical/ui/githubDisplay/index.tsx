import React from 'react';
import type { NodeKey } from 'lexical';

type Props = {
  id: string;
  data: string;
  nodeKey: NodeKey;
};

const GithubDisplayComponent = ({ id, data, nodeKey }: Props) => {
  return <div>GithubDisplayComponent</div>;
};

export default GithubDisplayComponent;
