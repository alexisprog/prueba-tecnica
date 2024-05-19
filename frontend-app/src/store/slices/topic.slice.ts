import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Topic } from "src/models/topic";

interface ITopicSlice {
  topics: Topic[];
  currentTopic: Topic | null;
  loading: boolean;
  error: string | null;
}

const initialState: ITopicSlice = {
  topics: [],
  currentTopic: null,
  error: null,
  loading: false,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    fetchTopicStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopicSuccess: (state, action: PayloadAction<Topic[]>) => {
      state.topics = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTopicFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentTopic: (state, action: PayloadAction<Topic>) => {
      state.currentTopic = action.payload;
    },
  },
});

export const {
  fetchTopicStart,
  fetchTopicSuccess,
  fetchTopicFailure,
  setCurrentTopic,
} = topicSlice.actions;
export default topicSlice.reducer;
