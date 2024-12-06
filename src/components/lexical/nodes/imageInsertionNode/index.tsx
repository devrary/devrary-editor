import {
  Spread,
  SerializedLexicalNode,
  DOMConversionOutput,
  DecoratorNode,
  NodeKey,
  $applyNodeReplacement,
  LexicalNode,
  EditorConfig,
  DOMExportOutput,
  DOMConversionMap,
} from 'lexical';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ImageInsertionComponent = dynamic(
  () => import('@/components/lexical/ui/imageInsertion'),
  { ssr: false }
);

export type ImageInsertionType = 'file' | 'url' | null;

export interface ImageInsertionPayload {
  mode: ImageInsertionType;
  status: boolean;
  id: string;
}

export type SerializedImageInsertionNode = Spread<
  {
    mode: ImageInsertionType;
    status: boolean;
    id: string;
  },
  SerializedLexicalNode
>;

export class ImageInsertionNode extends DecoratorNode<JSX.Element> {
  __mode: ImageInsertionType;
  __status: boolean;
  __id: string;

  constructor(
    mode: ImageInsertionType,
    status: boolean,
    id: string,
    key?: NodeKey
  ) {
    super(key);
    this.__mode = mode;
    this.__status = status;
    this.__id = id;
  }

  static getType(): string {
    return 'image-insertion';
  }

  static clone(node: ImageInsertionNode): ImageInsertionNode {
    return new ImageInsertionNode(
      node.__mode,
      node.__status,
      node.__id,
      node.getKey()
    );
  }

  static canBeEmpty() {
    return true;
  }

  exportJSON(): SerializedImageInsertionNode {
    return {
      type: 'image-insertion',
      version: 1,
      mode: this.__mode,
      status: this.__status,
      id: this.__id,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  getMode(): ImageInsertionType {
    return this.__mode;
  }

  static importJSON(
    serializedNode: SerializedImageInsertionNode
  ): ImageInsertionNode {
    const { id, mode, status } = serializedNode;
    const node = $createImageInsertionNode({
      mode,
      status,
      id,
    });

    return node;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    element.setAttribute('mode', this.__mode ?? '');
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: $convertImageInsertionElement,
        priority: 0,
      }),
    };
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageInsertionComponent
          id={this.__id}
          mode={this.__mode}
          nodeKey={this.getKey()}
        />
      </Suspense>
    );
  }
}

export function $createImageInsertionNode({
  mode,
  status,
  id,
}: ImageInsertionPayload): ImageInsertionNode {
  return $applyNodeReplacement(new ImageInsertionNode(mode, status, id));
}

export function $isImageInsertionNode(
  node: LexicalNode | null | undefined
): node is ImageInsertionNode {
  return node instanceof ImageInsertionNode;
}

function $convertImageInsertionElement(
  domNode: Node
): null | DOMConversionOutput {
  const div = domNode as HTMLDivElement;
  const mode = div.getAttribute('mode') as ImageInsertionType;
  const status = div.getAttribute('status') as string;
  const id = div.getAttribute('id') as string;
  const node = $createImageInsertionNode({
    mode,
    status: Boolean(status),
    id,
  });
  return { node };
}
