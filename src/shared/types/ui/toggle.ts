export type EditorToggleProps = {
  title: string;
  childrens: EditorToggleChildren[];
};

export type EditorToggleChildren = {
  title: string;
  icon: string;
  onClick: () => void;
  isSelect: boolean;
  childrens: EditorToggleChildren[];
};
