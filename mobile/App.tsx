import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text } from 'react-native';
import { store } from './src/store';
import PostListScreen from './src/screens/PostListScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import PostFormScreen from './src/screens/PostFormScreen';

// Define navigation param types
export type RootStackParamList = {
  PostList: undefined;
  PostDetail: { id: number };
  PostForm: { id?: number; isEdit?: boolean };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="PostList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3B82F6',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="PostList"
            component={PostListScreen}
            options={({ navigation }) => ({
              title: 'Blog Posts',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('PostForm')}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                    marginRight: 16,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: '500' }}>
                    New Post
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetailScreen}
            options={{
              title: 'Post Details',
            }}
          />
          <Stack.Screen
            name="PostForm"
            component={PostFormScreen}
            options={({ route }) => ({
              title: route.params?.isEdit ? 'Edit Post' : 'Create Post',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
