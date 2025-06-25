import axios from 'axios';
import { Post, CreatePostData, UpdatePostData, CreateCommentData, Comment, ApiResponse } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://YOUR_IP_ADDRESS:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for mobile
});


// Posts API
export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<ApiResponse<Post[]>>('/posts');
    return response.data.data;
  },

  getById: async (id: number): Promise<Post> => {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data.data;
  },

  create: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post<ApiResponse<Post>>('/posts', data);
    return response.data.data;
  },

  update: async (id: number, data: UpdatePostData): Promise<Post> => {
    const response = await api.patch<ApiResponse<Post>>(`/posts/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};

// Comments API
export const commentsApi = {
  create: async (postId: number, data: CreateCommentData): Promise<Comment> => {
    const response = await api.post<ApiResponse<Comment>>(`/posts/${postId}/comments`, data);
    return response.data.data;
  },
}; 