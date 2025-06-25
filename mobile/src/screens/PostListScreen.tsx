import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../store';
import { fetchPosts, deletePost } from '../store/slices/postsSlice';
import { Post } from '../types';

const PostListScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => dispatch(deletePost(id))
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const onRefresh = () => {
    dispatch(fetchPosts());
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetail', { id: item.id })}
        style={styles.postContent}
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postPreview} numberOfLines={3}>
          {item.content}
        </Text>
        <View style={styles.postMeta}>
          <Text style={styles.postAuthor}>By {item.author}</Text>
          <Text style={styles.postDate}>{formatDate(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.postActions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostForm', { id: item.id, isEdit: true })}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && posts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity onPress={onRefresh} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyTitle}>No posts</Text>
        <Text style={styles.emptyMessage}>Get started by creating a new post.</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostForm')}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  postPreview: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAuthor: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: 14,
    color: '#991B1B',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PostListScreen; 