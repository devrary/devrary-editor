import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/states/global/store';

export type EditorSliceShape = {
  showInputFormat: boolean;
};

const initialState: EditorSliceShape = {
  showInputFormat: true,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    SET_STATE: (state, action) => {
      const { type, value } = action.payload;
      if (type in state) {
        state[type as keyof EditorSliceShape] = value;
      }
    },
    CLEAR_STATE: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = { ...initialState };
    },
  },
});

export const { SET_STATE, CLEAR_STATE } = editorSlice.actions;

export const getEditorSlice = (state: RootState) => state.editor;

export default editorSlice.reducer;
