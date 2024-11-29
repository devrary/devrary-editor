import { ElementFormatType, NodeKey, TextNode } from "lexical";
import { ToolbarOptionType } from "@/shared/types/lexical/setting";
import { LineBreakNode, type Klass, type LexicalNode } from "lexical";
import { LexicalNodes } from "@/components/lexical/nodes";
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
import { AutocompleteNode } from "@/components/lexical/nodes/autoCompleteNode";
import { TweetNode } from "@/components/lexical/nodes/tweetNode";
import { YouTubeNode } from "@/components/lexical/nodes/youtubeNode";
import { FigmaNode } from "@/components/lexical/nodes/figmaNode";
import { CollapsibleContainerNode } from "@/components/lexical/nodes/collapsibleContainerNode";
import { CollapsibleContentNode } from "@/components/lexical/nodes/collapsibleContentNode";
import { CollapsibleTitleNode } from "@/components/lexical/nodes/collapsibleTitleNode";
import { MultiLinkNode } from "@/components/lexical/nodes/multiLinkNode";

export const LexicalBlockFormat = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  quote: "Quote",
  paragraph: "Paragraph",
};

export const LexicalRootType = {
  root: "Root",
  block: "Block",
};

export const LexicalCodeExtension: Record<string, string> = {
  c: "C",
  cpp: "C++",
  cs: "C#",
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  py: "Python",
  java: "Java",
  rb: "Ruby",
  php: "PHP",
  go: "Golang",
  swift: "Swift",
  kt: "Kotlin",
  sql: "SQL",
  shell: "Shell",
  bash: "Bash",
  ps1: "PowerShell",
  md: "Markdown",
  json: "JSON",
  yaml: "YAML",
  yml: "YML",
  xml: "XML",
  toml: "TOML",
  rust: "Rust",
  rs: "Objective-C",
  perl: "Perl",
  sol: "Solidity",
  move: "Move",
  scss: "SCSS",
  svg: "SVG",
  lua: "Lua",
  docker: "Dockerfile",
  asm: "Assembly",
  dart: "Dart",
  vue: "Vue",
  svelte: "Svelte",
  pb: "Protocol Buffer",
  txt: "Plain-Text",
};

export const LexicalCodeName: Record<string, string> = {
  c: "C",
  cpp: "C++",
  cs: "C#",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  jsx: "JSX",
  typescript: "TypeScript",
  tsx: "TSX",
  python: "Python",
  java: "Java",
  ruby: "Ruby",
  php: "PHP",
  go: "Golang",
  swift: "Swift",
  kotlin: "Kotlin",
  sql: "SQL",
  shell: "Shell",
  bash: "Bash",
  powershell: "PowerShell",
  markdown: "Markdown",
  json: "JSON",
  yaml: "YAML",
  yml: "YML",
  xml: "XML",
  toml: "TOML",
  rust: "Rust",
  objectivec: "Objective-C",
  perl: "Perl",
  solidity: "Solidity",
  move: "Move",
  scss: "SCSS",
  svg: "SVG",
  lua: "Lua",
  dockerfile: "Dockerfile",
  assembly: "Assembly",
  dart: "Dart",
  vue: "Vue",
  svelte: "Svelte",
  protobuf: "Protocol Buffer",
  plaintext: "Plain-Text",
};

export const LexicalElementFormatOptions: {
  [key in Exclude<ElementFormatType, "">]: ToolbarOptionType;
} = {
  center: {
    icon: "center-align",
    iconRTL: "center-align",
    name: "Center Align",
  },
  end: {
    icon: "right-align",
    iconRTL: "left-align",
    name: "End Align",
  },
  justify: {
    icon: "justify-align",
    iconRTL: "justify-align",
    name: "Justify Align",
  },
  left: {
    icon: "left-align",
    iconRTL: "left-align",
    name: "Left Align",
  },
  right: {
    icon: "right-align",
    iconRTL: "right-align",
    name: "Right Align",
  },
  start: {
    icon: "left-align",
    iconRTL: "right-align",
    name: "Start Align",
  },
};

export const LexicalInlineFormatOptions: {
  [key: string]: boolean;
} = {
  link: false,
  bold: false,
  italic: false,
  underline: false,
  code: false,
  highlight: false,
  subscript: false,
  superscript: false,
  strikethrough: false,
};

export const LexicalInlineFormatTooltips: {
  [key: string]: string;
} = {
  link: "⌘+l",
  bold: "⌘+b",
  italic: "⌘+i",
  underline: "⌘+u",
  code: "⌘+k",
  highlight: "⌘+h",
  subscript: "⌘+↓",
  superscript: "⌘+↑",
  strikethrough: "⌘+space",
};

export const LexicalNodeFormatOptions: {
  [key: NodeKey]: (typeof LexicalNodes)[number];
} = {
  link: LinkNode,
  linebreak: LineBreakNode,
  heading: HeadingNode,
  list: ListNode,
  listitem: ListItemNode,
  quote: QuoteNode,
  code: CodeNode,
  table: TableNode,
  tablecell: TableCellNode,
  tablerow: TableRowNode,
  hashtag: HashtagNode,
  codehighlight: CodeHighlightNode,
  autolink: AutoLinkNode,
  mark: MarkNode,
  overflow: OverflowNode,
  horizontalrule: HorizontalRuleNode,
  image: ImageNode,
  inlineimage: InlineImageNode,
  keyword: KeywordNode,
  layoutcontainer: LayoutContainerNode,
  layoutitem: LayoutItemNode,
  pagebreak: PageBreakNode,
  plaintext: TextNode,
  poll: PollNode,
  sticky: StickyNode,
  mention: MentionNode,
  emoji: EmojiNode,
  excalidraw: ExcalidrawNode,
  autocomplete: AutocompleteNode,
  tweet: TweetNode,
  youtube: YouTubeNode,
  figma: FigmaNode,
  collapsiblecontainer: CollapsibleContainerNode,
  collapsiblecontent: CollapsibleContentNode,
  collapsibletitle: CollapsibleTitleNode,
  multilink: MultiLinkNode,
};
