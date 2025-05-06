# MERN Stack Authentication Boilerplate

This is a full-stack authentication starter built using the MERN stack (MongoDB, Express.js, React, Node.js). It includes essential user auth features like signup, login, logout, email verification, and password reset, all integrated with Mailtrap for email testing.

---

## Live Preview

**Frontend**: [https://mern-auth-gajendra.vercel.app](https://mern-auth-gajendra.vercel.app)

---

## Technologies Used

### Frontend:
- React.js
- Vite
- Tailwind CSS
- Zustand (for state management)

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Mailtrap (for transactional emails)

---

## Features

- User registration and login with JWT
- Email verification with OTP
- Forgot password and reset functionality
- Protected routes with authentication middleware
- Zustand for managing frontend auth state
- Tailwind CSS-based modern UI
- Mailtrap integration for development email testing
- Modular and well-structured folder organization

---

## Folder Structure

mern-auth/

React frontend
├── client/ 
│ └── .env.example

Express backend
├── server/ 
│ └── .env.example

├── README.md


---

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mern-auth.git
cd mern-auth
```
*Split Terminal* 
<br>
``(ctrl+shift+5)``
<br>

2. **Install and run the frontend**
```
cd client
npm install
npm run dev
```

3. **Install and run the backend**
```
cd server
npm install
npm run dev
```
Ensure MongoDB is running locally or provide a remote URI.

After cloning the repo, rename both `.env.example` files to `.env` and fill in your credentials.

---

## API Endpoints

All routes are prefixed with `/api/auth`

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/check-auth`             | Check if user is authenticated  |
| POST   | `/signup`                 | Create a new user               |
| POST   | `/login`                  | Authenticate existing user      |
| POST   | `/logout`                 | Clear the session token         |
| POST   | `/verify-email`           | Verify user with OTP            |
| POST   | `/forgot-password`        | Send reset link to email        |
| POST   | `/reset-password/:token`  | Reset password with token       |

---

## Deployment

For frontend deployment, use platforms like **Vercel** or **Netlify**.

For backend deployment, use platforms like **Render**, **Railway**, or **Heroku**.

---

## Contributing

Fork the repo, make your changes, and submit a pull request.  
Feel free to open issues or request new features.

---

## Author

Developed by **Gajendra Rao**.  
Open to contributions, improvements, and collaborations.







