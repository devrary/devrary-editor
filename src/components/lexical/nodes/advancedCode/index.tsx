import { LexicalCodeName } from '@/shared/constants/lexical';
import {
  DecoratorNode,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

type SerializedAdvancedCodeNode = Spread<
  {
    data: string;
    language: keyof typeof LexicalCodeName;
  },
  SerializedLexicalNode
>;

const AdvancedCodeComponent = dynamic(
  () => import('@/components/lexical/ui/advancedCode'),
  { ssr: false }
);

export function $convertAdvancedCodeElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const data = domNode.getAttribute('data-lexical-advanced-code');
  const language = domNode.getAttribute('data-lexical-advanced-code-language');

  if (data && language) {
    const node = $createAdvancedCodeNode(
      data,
      language as keyof typeof LexicalCodeName
    );
    return {
      node,
    };
  }

  return null;
}

export class AdvancedCodeNode extends DecoratorNode<JSX.Element> {
  __data: string;
  __language: keyof typeof LexicalCodeName;

  constructor(
    data: string,
    language: keyof typeof LexicalCodeName,
    key?: NodeKey
  ) {
    super(key);
    this.__data = data;
    this.__language = language;
  }

  static getType(): string {
    return 'advanced-code';
  }

  static clone(node: AdvancedCodeNode): AdvancedCodeNode {
    return new AdvancedCodeNode(node.__data, node.__language, node.__key);
  }

  static importJSON(
    serializedNode: SerializedAdvancedCodeNode
  ): AdvancedCodeNode {
    return new AdvancedCodeNode(serializedNode.data, serializedNode.language);
  }

  exportJSON(): SerializedAdvancedCodeNode {
    return {
      ...super.exportJSON(),
      data: this.__data,
      language: this.__language,
      version: 1,
      type: 'advanced-code',
    };
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    element.setAttribute('data-lexical-advanced-code', this.__data);
    element.setAttribute(
      'data-lexical-advanced-code-language',
      this.__language
    );

    return { element };
  }

  setData(data: string, language: keyof typeof LexicalCodeName): void {
    const writable = this.getWritable();
    writable.__data = data;
    writable.__language = language;
  }

  getData(): string {
    return this.__data;
  }

  getLanguage(): keyof typeof LexicalCodeName {
    return this.__language;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <AdvancedCodeComponent
          data={this.__data}
          language={this.__language}
          nodeKey={this.getKey()}
        />
      </Suspense>
    );
  }
}

export function $createAdvancedCodeNode(
  data: string,
  language: keyof typeof LexicalCodeName
): AdvancedCodeNode {
  return new AdvancedCodeNode(data, language);
}

export function $isAdvancedCodeNode(
  node: LexicalNode | null | undefined
): node is AdvancedCodeNode {
  return node instanceof AdvancedCodeNode;
}
