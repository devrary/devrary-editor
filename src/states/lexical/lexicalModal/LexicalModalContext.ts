import { Context, createContext, Dispatch, SetStateAction } from 'react';

export type LexicalModalType = 'node-format' | 'tool-aggregation';

export type LexicalModalParamManager = {
  'tool-aggregation': ToolAggregationModalParam;
  'node-format': NodeFormatModalParam;
};

export type ToolAggregationModalParam = {
  position: { x: number; y: number };
};

export type NodeFormatModalParam = {
  position: { x: number; y: number };
};

export type LexicalModalShape = {
  key: LexicalModalType;
  params: LexicalModalParamManager[LexicalModalType];
};

export type LexicalModalManagerShape = {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  modal: LexicalModalShape[];
  addModal: (modal: LexicalModalShape) => void;
  removeModal: (key: LexicalModalType) => void;
  clearModal: () => void;
  relocateModal: (key: LexicalModalType, targetLayer: number) => void;
};

const initialState: LexicalModalManagerShape = {
  display: false,
  modal: [],
  setDisplay: () => {},
  addModal: () => {},
  removeModal: () => {},
  clearModal: () => {},
  relocateModal: () => {},
};

export const LexicalModalContext: Context<LexicalModalManagerShape> =
  createContext<LexicalModalManagerShape>(initialState);
