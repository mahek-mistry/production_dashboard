import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {fetchTasksApi} from '../../services/taskService';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, {rejectWithValue}) => {
    try {
      const data = await fetchTasksApi();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch tasks',
      );
    }
  },
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  lastFetched: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTaskStatus: (state, action) => {
      const {taskId, completed} = action.payload;

      const task = state.tasks.find(
        item => item.id === taskId,
      );

      if (task) {
        task.completed = completed;
      }
    },

    clearTasks: state => {
      state.tasks = [];
      state.error = null;
      state.lastFetched = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.lastFetched = new Date().toISOString();
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || 'Unable to load tasks';
      });
  },
});

export const {
  updateTaskStatus,
  clearTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;