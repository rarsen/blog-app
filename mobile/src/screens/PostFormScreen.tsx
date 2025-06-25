import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../store';
import { createPost, updatePost, fetchPost } from '../store/slices/postsSlice';
import { CreatePostData } from '../types';

const PostFormScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector((state: RootState) => state.posts);

  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    author: '',
  });

  const isEdit = route.params?.isEdit || false;
  const postId = route.params?.id;

  useEffect(() => {
    if (isEdit && postId) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, isEdit, postId]);

  useEffect(() => {
    if (isEdit && currentPost) {
      setFormData({
        title: currentPost.title,
        content: currentPost.content,
        author: currentPost.author,
      });
    }
  }, [isEdit, currentPost]);

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      if (isEdit && postId) {
        await dispatch(updatePost({ id: postId, data: formData }));
      } else {
        await dispatch(createPost(formData));
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save post. Please try again.');
    }
  };

  if (loading && isEdit) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading post...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter post title"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            maxLength={200}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Author *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter author name"
            value={formData.author}
            onChangeText={(text) => setFormData({ ...formData, author: text })}
            maxLength={100}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Content *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write your post content here..."
            value={formData.content}
            onChangeText={(text) => setFormData({ ...formData, content: text })}
            multiline
            numberOfLines={12}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isEdit ? 'Update Post' : 'Create Post'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
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
  formContainer: {
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
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    minHeight: 200,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
});

export default PostFormScreen;
