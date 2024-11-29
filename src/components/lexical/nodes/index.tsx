import { LineBreakNode, TextNode, type Klass, type LexicalNode } from "lexical";
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
import { PollNode } from "@/components/lexical/nodes/pollNode";
import { StickyNode } from "@/components/lexical/nodes/stickyNode";
import { MentionNode } from "@/components/lexical/nodes/mentionNode";
import { EmojiNode } from "@/components/lexical/nodes/emojiNode";
import { ExcalidrawNode } from "@/components/lexical/nodes/excalidrawNode";
import { EquationNode } from "@/components/lexical/nodes/equationNode";
import { AutocompleteNode } from "@/components/lexical/nodes/autoCompleteNode";
import { TweetNode } from "@/components/lexical/nodes/tweetNode";
import { YouTubeNode } from "@/components/lexical/nodes/youtubeNode";
import { FigmaNode } from "@/components/lexical/nodes/figmaNode";
import { CollapsibleContainerNode } from "@/components/lexical/nodes/collapsibleContainerNode";
import { CollapsibleContentNode } from "@/components/lexical/nodes/collapsibleContentNode";
import { CollapsibleTitleNode } from "@/components/lexical/nodes/collapsibleTitleNode";
import { MultiLinkNode } from "@/components/lexical/nodes//multiLinkNode";

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
  TextNode,
  PollNode,
  StickyNode,
  MentionNode,
  EmojiNode,
  ExcalidrawNode,
  EquationNode,
  AutocompleteNode,
  TweetNode,
  YouTubeNode,
  FigmaNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
  MultiLinkNode,
] as const;
