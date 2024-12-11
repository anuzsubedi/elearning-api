# eLearning API

This is the backend API for the eLearning platform. It provides endpoints for user authentication, course management, chapter management, image uploads, and enrollments.

## Features

- User authentication (signup, login, logout)
- Course creation, retrieval, update, and deletion
- Chapter creation, retrieval, update, and deletion
- Image upload and retrieval
- User enrollments in courses
- Middleware for authentication and file uploads

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/anuzsubedi/elearning-api.git
   cd elearning-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```env
   PORT=5000
   JWT_SECRET=your_secret_key
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=react_project
   DB_PORT=3306
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```sh
   npm run dev
   ```

### Frontend

The frontend for this project is available at [github.com/anuzsubedi/elearning-frontend](https://github.com/anuzsubedi/elearning-frontend).

### API Endpoints

#### Authentication

- `POST /auth/signup` - User signup
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

#### Courses

- `POST /courses/create` - Create a new course
- `GET /courses/all` - Get all courses
- `GET /courses/my-courses` - Get courses by the current user
- `GET /courses/:course_id` - Get a course by ID
- `PUT /courses/:course_id` - Edit a course
- `DELETE /courses/:course_id` - Delete a course

#### Chapters

- `POST /chapters` - Create a new chapter
- `GET /chapters/course/:course_id` - Get chapters for a course
- `GET /chapters/:chapter_id` - Get a specific chapter
- `PUT /chapters/:chapter_id` - Update a chapter
- `DELETE /chapters/:chapter_id` - Delete a chapter

#### Images

- `POST /image/upload` - Upload an image
- `GET /image/get/:image_id` - Get an image by ID

#### Enrollments

- `POST /enrollments` - Enroll a user in a course
- `GET /enrollments/all` - Get all enrollments
- `GET /enrollments/user` - Get enrollments by user
- `GET /enrollments/course/:course_id` - Get enrollments by course
- `DELETE /enrollments/:enrollment_id` - Delete an enrollment
