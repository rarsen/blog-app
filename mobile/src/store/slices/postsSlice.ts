import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, CreatePostData, UpdatePostData, CreateCommentData } from '../../types';
import { postsApi, commentsApi } from '../../services/api';

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    return await postsApi.getAll();
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id: number) => {
    return await postsApi.getById(id);
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (data: CreatePostData) => {
    return await postsApi.create(data);
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, data }: { id: number; data: UpdatePostData }) => {
    return await postsApi.update(id, data);
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    await postsApi.delete(id);
    return id;
  }
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, data }: { postId: number; data: CreateCommentData }) => {
    const comment = await commentsApi.create(postId, data);
    return { postId, comment };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Fetch single post
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update post';
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete post';
      })
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (state.currentPost?.id === postId) {
          state.currentPost.comments = state.currentPost.comments || [];
          state.currentPost.comments.push(comment);
        }
      });
  },
});

export const { clearError, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer; 