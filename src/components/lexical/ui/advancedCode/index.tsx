import { LexicalCodeName } from '@/shared/constants/lexical';
import React from 'react';
import type { NodeKey } from 'lexical';

type Props = {
  data: string;
  language: keyof typeof LexicalCodeName;
  nodeKey: NodeKey;
};

const AdvancedComponent = ({ data, language, nodeKey }: Props) => {
  return <div>AdvancedComponent</div>;
};

export default AdvancedComponent;
