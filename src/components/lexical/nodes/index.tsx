import { LineBreakNode, type Klass, type LexicalNode } from "lexical";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { HashtagNode } from "@lexical/hashtag";
import { MarkNode } from "@lexical/mark";
import { OverflowNode } from "@lexical/overflow";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ImageNode } from "@/components/lexical/nodes/imageNode";
import { InlineImageNode } from "@/components/lexical/nodes/inlineImageNode";
import { KeywordNode } from "@/components/lexical/nodes/keywordNode";
import { LayoutContainerNode } from "@/components/lexical/nodes/layoutContainerNode";
import { LayoutItemNode } from "@/components/lexical/nodes/layoutItemNode";
import { PageBreakNode } from "@/components/lexical/nodes/pageBreakNode";

export const LexicalNodes: Array<Klass<LexicalNode>> = [
  LinkNode,
  HeadingNode,
  ListNode,
  ListItemNode,
  LineBreakNode,
  QuoteNode,
  CodeNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  OverflowNode,
  MarkNode,
  HorizontalRuleNode,
  ImageNode,
  InlineImageNode,
  KeywordNode,
  LayoutContainerNode,
  LayoutItemNode,
  PageBreakNode,
];
