import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { DecoratorNode } from 'lexical';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const GithubDisplayComponent = dynamic(
  () => import('@/components/lexical/ui/githubDisplay'),
  { ssr: false }
);

function $convertGithubElement(
  domNode: HTMLElement
): DOMConversionOutput | null {
  const githubData = domNode.getAttribute('data-lexical-github-json');
  const githubId = domNode.getAttribute('data-lexical-github-id');

  if (githubData && githubId) {
    const node = $createGithubNode(githubId, githubData);
    return {
      node,
    };
  }

  return null;
}

export type SerializedGithubNode = Spread<
  {
    id: string;
    data: string;
  },
  SerializedLexicalNode
>;

export class GithubNode extends DecoratorNode<JSX.Element> {
  __id: string;
  __data: string;

  static getType(): string {
    return 'github';
  }

  constructor(id: string, data: string, key?: NodeKey) {
    super(key);
    this.__id = id;
    this.__data = data;
  }

  static clone(node: GithubNode): GithubNode {
    return new GithubNode(node.__id, node.__data, node.__key);
  }

  static importJSON(serializedNode: SerializedGithubNode): LexicalNode {
    return new GithubNode(serializedNode.id, serializedNode.data);
  }

  exportJSON(): SerializedGithubNode {
    return {
      ...super.exportJSON(),
      id: this.__id,
      data: this.__data,
      type: 'github',
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div');

    return div;
  }

  updateDOM(): false {
    return false;
  }

  static importDOM(): DOMConversionMap<HTMLDivElement> | null {
    return {
      div: (domNode: HTMLDivElement) => {
        if (!domNode.hasAttribute('data-lexical-github-json')) {
          return null;
        }
        return {
          conversion: $convertGithubElement,
          priority: 1,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');

    element.setAttribute('data-lexical-github-json', this.__data);

    return { element };
  }

  setData(data: string): void {
    const self = this.getWritable();
    self.__data = data;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <GithubDisplayComponent
          nodeKey={this.getKey()}
          id={this.__id}
          data={this.__data}
        />
      </Suspense>
    );
  }
}

export function $createGithubNode(id: string, data: string): GithubNode {
  return new GithubNode(id, data);
}

export function $isGithubNode(
  node: LexicalNode | null | undefined
): node is GithubNode {
  return node instanceof GithubNode;
}
