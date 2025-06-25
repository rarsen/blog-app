import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../store';
import { fetchPost, deletePost, addComment } from '../store/slices/postsSlice';
import { CreateCommentData } from '../types';

const PostDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector((state: RootState) => state.posts);
  
  const [commentForm, setCommentForm] = useState<CreateCommentData>({
    content: '',
    author: '',
  });

  const postId = route.params?.id;

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, postId]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (currentPost) {
              await dispatch(deletePost(currentPost.id));
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  const handleCommentSubmit = async () => {
    if (currentPost && commentForm.content.trim() && commentForm.author.trim()) {
      await dispatch(addComment({ postId: currentPost.id, data: commentForm }));
      setCommentForm({ content: '', author: '' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading post...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!currentPost) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{currentPost.title}</Text>
        <Text style={styles.postContent}>{currentPost.content}</Text>
        <Text style={styles.postAuthor}>By {currentPost.author}</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PostForm', { 
              id: currentPost.id, 
              isEdit: true 
            })}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>
          Comments ({currentPost.comments?.length || 0})
        </Text>

        <View style={styles.commentForm}>
          <TextInput
            style={styles.nameInput}
            placeholder="Your Name"
            value={commentForm.author}
            onChangeText={(text) => setCommentForm({ ...commentForm, author: text })}
          />
          
          <TextInput
            style={styles.commentInput}
            placeholder="Write your comment here..."
            value={commentForm.content}
            onChangeText={(text) => setCommentForm({ ...commentForm, content: text })}
            multiline
          />
          
          <TouchableOpacity
            onPress={handleCommentSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Add Comment</Text>
          </TouchableOpacity>
        </View>

        {currentPost.comments && currentPost.comments.length > 0 ? (
          currentPost.comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <Text style={styles.commentDate}>{formatDate(comment.createdAt)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noCommentsText}>
            No comments yet. Be the first to comment!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  postContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  postContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  postAuthor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  commentsContainer: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  commentForm: {
    marginBottom: 24,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  commentItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    paddingLeft: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  noCommentsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#991B1B',
    textAlign: 'center',
  },
});

export default PostDetailScreen; 