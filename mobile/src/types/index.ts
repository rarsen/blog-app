export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  postId: number;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  author?: string;
}

export interface CreateCommentData {
  content: string;
  author: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
} 