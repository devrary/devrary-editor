import {
  DecoratorNode,
  DOMConversionOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import * as React from "react";
import dynamic from "next/dynamic";

const PageBreakComponent = dynamic(
  () => import("@/components/lexical/ui/pageBreak")
);

export type SerializedPageBreakNode = Spread<
  {
    sequence: number;
  },
  SerializedLexicalNode
>;

export class PageBreakNode extends DecoratorNode<JSX.Element> {
  __sequence: number;

  constructor(sequence: number, key?: NodeKey) {
    super(key);
    this.__sequence = sequence;
  }

  static getType(): string {
    return "page-break";
  }

  static clone(node: PageBreakNode): PageBreakNode {
    return new PageBreakNode(node.__sequence, node.__key);
  }

  static importJSON(serializedNode: SerializedPageBreakNode): PageBreakNode {
    return new PageBreakNode(serializedNode.sequence);
  }

  exportJSON() {
    return {
      type: this.getType(),
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    const el = document.createElement("figure");
    el.style.pageBreakAfter = "always";
    el.classList.add("lexical-pb");

    const span = document.createElement("span");
    span.innerHTML = `<span>${this.__sequence}</span>`;
    span.className = "sequence";
    el.appendChild(span);

    const div = document.createElement("div");
    div.className = "icon";
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-scissors" viewBox="0 0 16 16" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(270)">
      <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
    </svg>`; // SVG를 DOM에 추가

    el.appendChild(div);
    el.setAttribute("type", this.getType());
    return el;
  }

  getTextContent(): string {
    return "\n";
  }

  isInline(): false {
    return false;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <PageBreakComponent nodeKey={this.__key} sequence={this.__sequence} />
    );
  }

  setSequence(sequence: number): void {
    const self = this.getWritable();
    self.__sequence = sequence;
  }
}

export function $convertPageBreakElement(
  sequence: number
): DOMConversionOutput {
  return { node: $createPageBreakNode(sequence) };
}

export function $createPageBreakNode(sequence: number): PageBreakNode {
  return new PageBreakNode(sequence);
}

export function $isPageBreakNode(
  node: LexicalNode | null | undefined
): node is PageBreakNode {
  return node instanceof PageBreakNode;
}
