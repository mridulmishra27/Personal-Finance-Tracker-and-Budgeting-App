# ClinicConnect

A comprehensive healthcare management platform that integrates AI-powered chatbot functionality to streamline doctor appointments, patient management, and healthcare services. Built with modern web technologies and powered by Vercel AI SDK.

## 🌟 Features

### For Patients
- **User Registration & Authentication** - Secure user accounts with JWT authentication
- **Doctor Discovery** - Browse doctors by specialization (Cardiologist, Dermatologist, Neurologist, etc.)
- **Appointment Booking** - Easy appointment scheduling with available time slots
- **AI-Powered Chatbot** - Intelligent assistant for finding doctors and managing appointments
- **Profile Management** - Update personal information and medical history
- **Appointment Management** - View, cancel, and track appointment history
- **Real-time Notifications** - Toast notifications for better user experience

### For Doctors
- **Doctor Dashboard** - Comprehensive overview of appointments and patient data
- **Appointment Management** - View and manage patient appointments
- **Profile Management** - Update professional information and availability
- **Specialization Support** - Multiple medical specializations supported
- **Availability Control** - Manage working hours and availability status

### For Administrators
- **Admin Dashboard** - Complete system overview and analytics
- **Doctor Management** - Add, edit, and manage doctor profiles
- **Appointment Oversight** - Monitor all appointments across the platform
- **User Management** - Manage patient accounts and data
- **System Analytics** - Track platform usage and performance

### AI Integration
- **Smart Chatbot** - Powered by Google Gemini 2.0 Flash model
- **Natural Language Processing** - Understands appointment booking requests
- **Intelligent Doctor Matching** - Suggests appropriate specialists based on queries
- **Automated Responses** - Handles common queries and appointment management

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Notification system
- **Vercel AI SDK** - AI integration

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **Google AI SDK** - AI model integration

### AI & External Services
- **Google Gemini 2.0 Flash** - AI language model
- **Vercel AI SDK** - AI integration framework
- **Cloudinary** - Cloud-based image management

## 📁 Project Structure

```
ClinicConnect AI Integrated using Vercel AI/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── context/         # React context providers
│   │   └── assets/          # Static assets and images
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js backend API
│   ├── controllers/         # Request handlers
│   ├── models/             # Database schemas
│   ├── routes/             # API routes
│   ├── middlewares/        # Custom middleware
│   ├── config/             # Configuration files
│   ├── package.json
│   └── server.js
├── admin/                   # Admin panel (React)
│   ├── src/
│   │   ├── pages/          # Admin pages
│   │   ├── components/     # Admin components
│   │   └── context/        # Admin context
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google AI API key
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "ClinicConnect AI Integrated using Vercel AI"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Admin Panel Dependencies**
   ```bash
   cd ../admin
   npm install
   ```

5. **Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run server
   ```
   The API will be available at `http://localhost:4000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

3. **Start the Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```
   The admin panel will be available at `http://localhost:3000`

## 📚 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /update-profile` - Update user profile
- `POST /book-appointment` - Book appointment
- `GET /appointments` - Get user appointments

### Doctor Routes (`/api/doctor`)
- `GET /list` - Get all doctors
- `POST /login` - Doctor login
- `GET /appointments` - Get doctor appointments
- `POST /profile` - Update doctor profile

### Admin Routes (`/api/admin`)
- `POST /add-doc` - Add new doctor
- `POST /log-admin` - Admin login
- `GET /dashboard` - Admin dashboard data
- `GET /doctors` - Get all doctors
- `GET /appointments` - Get all appointments

### AI Routes (`/api/ai`)
- `POST /chat` - AI chatbot interaction

## 🤖 AI Chatbot Features

The integrated AI chatbot provides:
- **Doctor Search** - Find doctors by specialization
- **Appointment Booking** - Natural language appointment scheduling
- **Appointment Management** - Cancel or modify existing appointments
- **General Queries** - Answer healthcare-related questions
- **Navigation Assistance** - Guide users to relevant pages

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Modern Interface** - Clean and intuitive user interface
- **Real-time Feedback** - Toast notifications for user actions
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for passwords
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Cross-origin resource sharing configuration
- **File Upload Security** - Secure image upload handling


## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes
