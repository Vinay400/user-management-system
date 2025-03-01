# user-management-system
# User Management System with REST API

A complete CRUD application built with Node.js, Express.js, and EJS templating engine for managing user data through REST API endpoints.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Any code editor (VS Code recommended)
- Postman (for API testing)

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install express ejs body-parser nodemon
   ```

3. **Create project structure**
   ```
   user-management-system/
   ├── views/
   │   ├── index.ejs
   │   ├── userslist.ejs
   │   ├── newuser.ejs
   │   ├── updation.ejs
   │   └── DeletingUsers.ejs
   ├── User-Data.json
   ├── index.js
   ├── package.json
   └── README.md
   ```

4. **Configure package.json**
   ```json
   {
     "name": "user-management-system",
     "version": "1.0.0",
     "description": "REST API User Management System",
     "main": "index.js",
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
     }
   }
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

## API Endpoints

1. **View All Users**
   - GET `/api/users`
   - Displays all registered users

2. **Search User**
   - POST `/api/users/:id`
   - Search user by ID

3. **Create User**
   - GET `/api/newuser` (form)
   - POST `/api/newuser` (submit)
   - Create new user with details

4. **Update User**
   - GET `/api/updation` (form)
   - PATCH `/api/updation/:id`
   - Update existing user details

5. **Delete User**
   - GET `/api/deletion` (form)
   - DELETE `/api/deletion/:id`
   - Remove user from database

## Testing with Postman

1. Import the Postman collection (if provided)
2. Test each endpoint:
   - GET requests can be tested directly in browser
   - POST/PATCH/DELETE requests should be tested in Postman
   - Use appropriate headers and body format

## Features

- Complete CRUD Operations
- RESTful API Design
- Form Validation
- Error Handling
- JSON File Storage
- Responsive UI
- Real-time Updates
