# 🔥 Firestore Management System

This project provides a complete full-stack solution for managing user data with Google Cloud Firestore.

## 🏗️ Project Structure

```
├── backend-firestore/          # Node.js + Express + Firestore backend
│   ├── app.js                 # Main server file
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   └── genial-beaker-466204-p7-4dbe7a392e8c.json  # Google Cloud credentials
├── frontend/                  # Angular frontend
│   └── src/app/
│       ├── components/
│       │   └── firestore-management/  # Firestore UI component
│       └── services/
│           └── firestore.service.ts   # Firestore API service
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Angular CLI (v18+)
- Google Cloud Project with Firestore enabled
- Service account JSON key file

### 1. Backend Setup (Firestore)

```bash
# Navigate to backend directory
cd backend-firestore

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend will run on `http://localhost:3001`

#### Environment Variables

The `.env` file contains:

```
PORT=3001
GOOGLE_CLOUD_PROJECT_ID=genial-beaker-466204-p7
GOOGLE_APPLICATION_CREDENTIALS=./genial-beaker-466204-p7-4dbe7a392e8c.json
NODE_ENV=development
```

### 2. Frontend Setup (Angular)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
```

The frontend will run on `http://localhost:4200`

## 📋 Features

### User Data Structure

Each user document contains:

- `id` (string) - Auto-generated Firestore document ID
- `name` (string) - User's full name
- `email` (string) - User's email address

### Available Operations

- ✅ **Create** new users
- 📖 **Read** all users or specific user
- ✏️ **Update** existing users
- 🗑️ **Delete** users
- 🔍 **Connection testing**

## 🌐 API Endpoints

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | `/api/test`      | Test Firestore connection |
| GET    | `/api/users`     | Get all users             |
| GET    | `/api/users/:id` | Get user by ID            |
| POST   | `/api/users`     | Create new user           |
| PUT    | `/api/users/:id` | Update user               |
| DELETE | `/api/users/:id` | Delete user               |
| GET    | `/health`        | Health check              |

### Request/Response Examples

#### Create User

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

#### Response

```json
{
  "id": "abc123xyz",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

## 🎨 UI Features

### Firestore Management Component

- Modern, responsive design
- Real-time connection status indicator
- CRUD operations with form validation
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Mobile-friendly interface

### Key UI Elements

- 🔄 **Refresh Button** - Reload users from Firestore
- ➕ **Add User Button** - Open creation form
- ✏️ **Edit Button** - Modify existing users
- 🗑️ **Delete Button** - Remove users with confirmation
- 🔥 **Connection Status** - Shows Firestore connectivity

## 🔧 Google Cloud Firestore Setup

1. **Create a Google Cloud Project**
2. **Enable Firestore Database**
3. **Create Service Account**
   - Go to IAM & Admin > Service Accounts
   - Create new service account
   - Assign "Cloud Datastore User" role
4. **Download JSON Key**
   - Generate and download the service account key
   - Rename to match the filename in your project
   - Place in `backend-firestore/` directory

## 🛠️ Development Commands

### Backend Commands

```bash
npm start          # Production mode
npm run dev        # Development with nodemon
```

### Frontend Commands

```bash
ng serve           # Development server
ng build           # Production build
ng test            # Run unit tests
```

## 🔒 Security Notes

- Service account JSON file contains sensitive credentials
- Add to `.gitignore` in production
- Use environment variables for production deployment
- Implement proper authentication for production use

## 📱 Responsive Design

The UI is fully responsive and optimized for:

- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🚦 Status Indicators

- ✅ **Connected** - Firestore is accessible
- ❌ **Disconnected** - Connection failed
- 🔄 **Loading** - Operations in progress
- ✅ **Success** - Operations completed successfully
- ❌ **Error** - Operations failed with details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

---

Built with ❤️ using Angular, Node.js, Express, and Google Cloud Firestore
