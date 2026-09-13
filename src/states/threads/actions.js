import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../utils/api';
import { getToken } from '../../utils/storage';

const asyncGetThreads = createAsyncThunk(
  'threads/getThreads',
  async () => {
    const response = await api('/threads');

    return response.data.threads;
  },
);

const asyncGetThreadDetail = createAsyncThunk(
  'threads/getThreadDetail',
  async (threadId) => {
    const response = await api(`/threads/${threadId}`);

    return response.data.detailThread;
  },
);

const asyncCreateThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }) => {
    const token = getToken();

    const response = await api('/threads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    })

    return response.data.thread;
  },
);

const asyncCreateComment = createAsyncThunk(
  'threads/createComment',
  async ({ threadId, content }) => {
    const token = getToken();

    const response = await api(`/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
      }),
    });

    return response.data.comment;
  },
);

export {
  asyncCreateThread,
  asyncGetThreadDetail,
  asyncGetThreads,
  asyncCreateComment,
};