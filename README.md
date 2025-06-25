# Blog Mobile App

A React Native mobile application for managing blog posts and comments, built with Expo and TypeScript. This app provides a seamless mobile experience for creating, viewing, editing, and commenting on blog posts.

## 📱 Features

- **Post Management**
  - View all blog posts in a clean, scrollable list
  - Create new blog posts with title, content, and author
  - Edit existing posts
  - Delete posts with confirmation
  - Pull-to-refresh functionality

- **Post Details**
  - View full post content with formatted dates
  - Read and add comments
  - Navigate between posts seamlessly

- **Comments System**
  - Add comments to any post
  - View all comments with author information
  - Real-time comment submission

- **User Experience**
  - Modern, responsive UI design
  - Loading states and error handling
  - Stack navigation between screens
  - Status bar customization

## 🛠 Technologies Used
### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Language**: TypeScript
### Mobile
- **Framework**: React Native with Expo 
- **Language**: TypeScript 
- **State Management**: Redux Toolkit 
- **UI Components**: React Native built-in components
- **Development**: Expo CLI

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Installation & Setup

**Clone the repository**
   ```bash
   git clone https://github.com/rarsen/blog-app.git
   cd mobile
   ```
### Mobile Setup
- **Install dependencies**
   ```bash
   npm install
   ```

- **Configure API endpoint**
   
   Update the API base URL in `src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3001/api';
   ```
   
   Replace `YOUR_IP_ADDRESS` with your computer's local IP address to enable mobile device connectivity.
- **Start the development server**
   ```bash
   npm start
   ```
### Backend Setup
   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the backend directory:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=blog_app
   PORT=3001
   ```

   - Create the PostgreSQL database:
   ```sql
   CREATE DATABASE blog_app;
   ```

   - Run the application:
   ```bash
   # Development
   npm run start:dev
   ## 📱 Running the App

   ### Development Mode

   - **Start Expo development server**:
   ```bash
   npm start
   ```
### Testing on Physical Device

1. Install the Expo Go app from your device's app store
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device

## 📁 Project Structure

### Backend Structure
```
backend/
├── nest-cli.json          # NestJS CLI configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── src/
    ├── main.ts            # Application entry point
    ├── app.module.ts      # Root application module
    ├── posts/             # Posts module
    │   ├── posts.controller.ts     # Posts REST API endpoints
    │   ├── posts.service.ts        # Posts business logic
    │   ├── posts.module.ts         # Posts module definition
    │   ├── dto/
    │   │   ├── create-post.dto.ts  # Create post validation
    │   │   └── update-post.dto.ts  # Update post validation
    │   └── entities/
    │       └── post.entity.ts      # Post database entity
    └── comments/          # Comments module
        ├── comments.controller.ts  # Comments REST API endpoints
        ├── comments.service.ts     # Comments business logic
        ├── comments.module.ts      # Comments module definition
        ├── dto/
        │   └── create-comment.dto.ts # Create comment validation
        └── entities/
            └── comment.entity.ts   # Comment database entity
```

### Mobile Structure
```
mobile/
├── App.tsx                 # Main app component with navigation
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── assets/                # Static assets (icons, images)
│   ├── icon.png
│   ├── favicon.png
│   └── splash-icon.png
└── src/
    ├── screens/           # Screen components
    │   ├── PostListScreen.tsx      # Home screen with post list
    │   ├── PostDetailScreen.tsx    # Individual post view
    │   └── PostFormScreen.tsx      # Create/edit post form
    ├── store/             # Redux store configuration
    │   ├── index.ts       # Store setup
    │   └── slices/
    │       └── postsSlice.ts       # Posts state management
    ├── services/          # API services
    │   └── api.ts         # HTTP client and API calls
    └── types/             # TypeScript type definitions
        └── index.ts       # Interface definitions
```


### Example of usage


https://github.com/user-attachments/assets/b2fc9047-2294-45e4-9fc8-f12b12cb51de

