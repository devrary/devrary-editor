import type { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
  autocomplete: "lexical-autocomplete",
  blockCursor: "lexical-block-cursor",
  characterLimit: "lexical-character-limit",
  code: "lexical-code",
  codeHighlight: {
    atrule: "lexical-code-atrule",
    attr: "lexical-code-attr",
    boolean: "lexical-code-boolean",
    builtin: "lexical-code-builtin",
    cdata: "lexical-code-cdata",
    char: "lexical-code-char",
    class: "lexical-code-class",
    "class-name": "lexical-code-class-name",
    comment: "lexical-code-comment",
    constant: "lexical-code-constant",
    deleted: "lexical-code-deleted",
    doctype: "lexical-code-doctype",
    entity: "lexical-code-entity",
    function: "lexical-code-function",
    important: "lexical-code-important",
    inserted: "lexical-code-inserted",
    keyword: "lexical-code-keyword",
    namespace: "lexical-code-namespace",
    number: "lexical-code-number",
    operator: "lexical-code-operator",
    prolog: "lexical-code-prolog",
    property: "lexical-code-property",
    punctuation: "lexical-code-punctuation",
    regex: "lexical-code-regex",
    selector: "lexial-code-selector",
    string: "lexical-code-string",
    symbol: "lexical-code-symbol",
    tag: "lexical-code-tag",
    url: "lexical-code-url",
    variable: "lexical-code-variable",
  },
  embedBlock: {
    base: "lexical-embed-block-base",
    focus: "lexical-embed-block-focus",
  },
  hashtag: "lexical-hashtag",
  heading: {
    h1: "lexical-heading-h1",
    h2: "lexical-heading-h2",
    h3: "lexical-heading-h3",
    h4: "lexical-heading-h4",
    h5: "lexical-heading-h5",
    h6: "lexical-heading-h6",
  },
  hr: "lexical-hr",
  pb: "lexical-pb",
  image: "lexical-editor-image",
  indent: "lexical-indent",
  inlineImage: "lexical-inline-editor-image",
  layoutContainer: "lexical-layout-container",
  layoutItem: "lexical-layout-item",
  link: "lexical-link",
  list: {
    checklist: "lexical-list-checklist",
    listitem: "lexical-list-listitem",
    listitemChecked: "lexical-list-listitem-checked",
    listitemUnchecked: "lexical-list-listitem-unchecked",
    nested: {
      listitem: "lexical-list-nested-listitem",
    },
    olDepth: [
      "lexical-list-ol-depth-1",
      "lexical-list-ol-depth-2",
      "lexical-list-ol-depth-3",
      "lexical-list-ol-depth-4",
      "lexical-list-ol-depth-5",
    ],
    ul: "lexical-list-ul",
  },
  ltr: "lexical-ltr",
  mark: "lexical-mark",
  markOverlap: "lexical-mark-overlap",
  paragraph: "lexical-paragraph",
  quote: "lexical-quote",
  rtl: "lexical-rtl",
  table: "lexical-table",
  tableCell: "lexical-table-cell",
  tableCellActionButton: "lexical-table-cell-action-button",
  tableCellActionButtonContainer: "lexical-table-cell-action-button-container",
  tableCellEditing: "lexical-table-cell-editing",
  tableCellHeader: "lexical-table-cell-header",
  tableCellPrimarySelected: "lexical-table-cell-primary-selected",
  tableCellResizer: "lexical-table-cell-resizer",
  tableCellSelected: "lexical-table-cell-selected",
  tableCellSortedIndicator: "lexical-table-cell-sorted-indicator",
  tableResizeRuler: "lexical-table-resize-ruler",
  tableRowStriping: "lexical-table-row-striping",
  tableSelected: "lexical-table-selected",
  tableSelection: "lexical-table-selection",
  text: {
    bold: "lexical-text-bold",
    code: "lexical-text-code",
    italic: "lexical-text-italic",
    strikethrough: "lexical-text-strikethrough",
    subscript: "lexical-text-subscript",
    superscript: "lexical-text-superscript",
    underline: "lexical-text-underline",
    underlineStrikethrough: "lexical-text-underline-strikethrough",
  },
};

export default theme;
