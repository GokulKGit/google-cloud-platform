# User Management System - Full Stack Application

This is a full-stack user management application built with Angular (frontend) and Node.js with Express (backend), using MySQL database.

## Features

### Backend (Node.js + Express + MySQL)

- ✅ RESTful API with full CRUD operations
- ✅ MySQL database integration with connection pooling
- ✅ Input validation and error handling
- ✅ Automatic database and table creation
- ✅ Environment variable configuration

### Frontend (Angular)

- ✅ Modern Angular UI with standalone components
- ✅ Reactive forms with validation
- ✅ HTTP client integration
- ✅ Beautiful gradient design with responsive layout
- ✅ Real-time error handling and success messages

## API Endpoints

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/users`     | Get all users   |
| GET    | `/api/users/:id` | Get user by ID  |
| POST   | `/api/users`     | Create new user |
| PUT    | `/api/users/:id` | Update user     |
| DELETE | `/api/users/:id` | Delete user     |
| GET    | `/health`        | Health check    |

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
copy .env.example .env
# Edit .env file with your database credentials

# Start the backend server
npm start
# or for development with auto-reload
npm run dev
```

The backend server will start on `http://localhost:3000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Angular development server
npm start
```

The frontend will start on `http://localhost:4200`

### 3. Database Setup

The application will automatically:

- Create the database if it doesn't exist
- Create the `users` table with proper schema
- Set up indexes for better performance

Default database configuration:

- Host: localhost
- Port: 3306
- Database: user_management
- Username: root
- Password: (empty)

## Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=user_management

# Server Configuration
PORT=3000

# Environment
NODE_ENV=development
```

## Database Schema

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);
```

## Testing the API

You can test the API using curl commands:

### Create a user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Get all users

```bash
curl http://localhost:3000/api/users
```

### Get user by ID

```bash
curl http://localhost:3000/api/users/1
```

### Update user

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "johnsmith@example.com"}'
```

### Delete user

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Project Structure

```
├── backend/
│   ├── app.js                 # Main application file
│   ├── package.json           # Backend dependencies
│   ├── .env.example          # Environment template
│   ├── config/
│   │   └── database.config.js # Database configuration
│   └── routes/
│       └── user.routes.js     # User API routes
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   └── user-management/  # User management component
    │   │   ├── services/
    │   │   │   └── user.service.ts   # API service
    │   │   ├── app.component.*       # Main app component
    │   │   └── app.config.ts         # App configuration
    │   └── main.ts               # Angular bootstrap
    └── package.json              # Frontend dependencies
```

## Features in Detail

### Frontend Features

- **Modern Angular Architecture**: Uses standalone components and the latest Angular features
- **Reactive Forms**: Form validation with real-time feedback
- **HTTP Integration**: Service-based API communication
- **Responsive Design**: Mobile-friendly UI
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

### Backend Features

- **Database Connection Pooling**: Efficient MySQL connections
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error responses
- **Auto Database Setup**: Automatic database and table creation
- **Environment Configuration**: Secure configuration management

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check MySQL server is running
   - Verify credentials in `.env` file
   - Ensure database user has proper permissions

2. **CORS Errors**

   - Backend includes CORS middleware for all origins
   - For production, update CORS settings to be more restrictive

3. **Port Already in Use**

   - Backend: Change PORT in `.env` file
   - Frontend: Use `ng serve --port 4201` for different port

4. **Angular Compilation Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version compatibility

## Development

For development, you can run both servers simultaneously:

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm start`

The frontend will automatically proxy API requests to the backend.

## Production Deployment

### Backend

1. Set NODE_ENV=production in .env
2. Configure production database
3. Use process manager like PM2

### Frontend

1. Build: `ng build --prod`
2. Serve static files from `dist/` directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
