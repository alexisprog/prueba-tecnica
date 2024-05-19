import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Content } from "src/models/content";

interface IContentSlice {
  contentsList: Content[];
  currentContent: Content | null;
  loading: boolean;
  error: string | null;
}

const initialState: IContentSlice = {
  contentsList: [],
  currentContent: null,
  error: null,
  loading: false,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    fetchContentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchContentSuccess: (state, action: PayloadAction<Content[]>) => {
      state.contentsList = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchContentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentContent: (state, action: PayloadAction<Content>) => {
      state.currentContent = action.payload;
    },
  },
});

export const {
  fetchContentStart,
  fetchContentSuccess,
  fetchContentFailure,
  setCurrentContent,
} = contentSlice.actions;
export default contentSlice.reducer;
