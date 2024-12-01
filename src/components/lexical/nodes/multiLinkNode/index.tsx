import {
  DecoratorNode,
  type DOMConversionOutput,
  type DOMExportOutput,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

type DisplayType = 'embed' | 'mark';

type Dimension = number | 'inherit';

const LinkDisplayComponent = dynamic(() => {
  return import('@/components/lexical/ui/multiLink');
});

export type SerializedMultiLinkNode = Spread<
  {
    data: string;
    display: DisplayType;
    width?: Dimension;
    height?: Dimension;
  },
  SerializedLexicalNode
>;

export function $convertMultiLinkElement(
  domNode: HTMLElement,
  display: DisplayType
): DOMConversionOutput | null {
  const multiLinkData = domNode.getAttribute('data-lexical-multi-link-json');
  const stylesAttributes = window.getComputedStyle(domNode);
  const heightStr = stylesAttributes.getPropertyValue('height');
  const widthStr = stylesAttributes.getPropertyValue('width');

  const height =
    !heightStr || heightStr === 'inherit' ? 'inherit' : parseInt(heightStr, 10);
  const width =
    !widthStr || widthStr === 'inherit' ? 'inherit' : parseInt(widthStr, 10);

  if (multiLinkData) {
    const node = $createMultiLinkNode(multiLinkData, display, width, height);
    return {
      node,
    };
  }
  return null;
}

export class MultiLinkNode extends DecoratorNode<JSX.Element> {
  __data: string;
  __display: DisplayType;
  __width: Dimension;
  __height: Dimension;

  constructor(
    data: string = '[]',
    display: DisplayType,
    width: Dimension = 'inherit',
    height: Dimension = 'inherit',
    key?: NodeKey
  ) {
    super(key);
    this.__data = data;
    this.__display = display;
    this.__width = width;
    this.__height = height;
  }

  static getType(): string {
    return 'multi-link';
  }

  static clone(node: MultiLinkNode): MultiLinkNode {
    return new MultiLinkNode(
      node.__data,
      node.__display,
      node.__width,
      node.__height,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedMultiLinkNode): MultiLinkNode {
    return new MultiLinkNode(
      serializedNode.data,
      serializedNode.display,
      serializedNode.width ?? 'inherit',
      serializedNode.height ?? 'inherit'
    );
  }

  exportJSON(): SerializedMultiLinkNode {
    return {
      ...super.exportJSON(),
      data: this.__data,
      display: this.__display,
      width: this.__width,
      height: this.__height,
      version: 1,
      type: 'multi-link',
    };
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.style.display = 'inline-block';

    element.style.width =
      this.__width === 'inherit' ? 'inherit' : `${this.__width}px`;
    element.style.height =
      this.__height === 'inherit' ? 'inherit' : `${this.__height}px`;

    element.setAttribute('data-lexical-excalidraw-json', this.__data);
    return { element };
  }

  setData(data: string): void {
    const self = this.getWritable();
    self.__data = data;
  }

  getWidth(): Dimension {
    return this.getLatest().__width;
  }

  setWidth(width: Dimension): void {
    const self = this.getWritable();
    self.__width = width;
  }

  getHeight(): Dimension {
    return this.getLatest().__height;
  }

  setHeight(height: Dimension): void {
    const self = this.getWritable();
    self.__height = height;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <LinkDisplayComponent
          nodeKey={this.getKey()}
          data={this.__data}
          display={this.__display}
        />
      </Suspense>
    );
  }
}

export function $createMultiLinkNode(
  data: string,
  display: DisplayType,
  width: Dimension,
  height: Dimension
) {
  return new MultiLinkNode(data, display, width, height);
}

export function $isMultiLinkNode(
  node: LexicalNode | null | undefined
): node is MultiLinkNode {
  return node instanceof MultiLinkNode;
}
