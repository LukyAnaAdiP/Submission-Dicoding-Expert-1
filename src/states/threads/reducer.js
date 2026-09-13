import { createSlice } from '@reduxjs/toolkit';

import {
  asyncCreateComment,
  asyncCreateThread,
  asyncGetThreadDetail,
  asyncGetThreads,
} from './actions';

const initialState = {
  threads: [],
  detailThread: null,

  isLoading: false,
  isCreating: false,
  isCreateingComment: false,
  isDetailLoading: false,
  
  error: null,
  createError: null,
  detailError: null,
  commentError: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Threads
      .addCase(asyncGetThreads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncGetThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload;
      })
      .addCase(asyncGetThreads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      // Detail Threads
      .addCase(asyncGetThreadDetail.pending, (state) => {
        state.isDetailLoading = true;
        state.detailError = null;
        state.detailThread = null;
      })
      .addCase(asyncGetThreadDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.detailThread = action.payload;
      })
      .addCase(asyncGetThreadDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError = action.error.message;
      })

      // Create Thread
      .addCase(asyncCreateThread.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        state.isCreating = false;

        state.threads.unshift({
          ...action.payload,
          owner: null,
        });
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.error.message;
      })
      
      // Create Comment 
      .addCase(asyncCreateComment.pending, (state) => {
        state.isCreateingComment = true;
        state.commentError = null;
      })
      .addCase(asyncCreateComment.fulfilled, (state, action) => {
        state.isCreateingComment = false;

        if (state.detailThread) {
          state.detailThread.comments.push(action.payload)
        }
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        state.isCreateingComment = false;
        state.commentError = action.error.message;
      });
  },
});

export default threadsSlice.reducer;