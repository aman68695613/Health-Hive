# 🏥 Healthcare App

Welcome to the **Healthcare App**, a modern and user-friendly platform designed to streamline doctor consultations, patient management, and healthcare services. This app ensures seamless interaction between doctors and patients, providing easy appointment scheduling, secure authentication, and a smooth user experience.

## 🚀 Features

### ✅ User Features:
- 🔐 **Secure Authentication** (Sign up/Login with JWT & OAuth)
- 👨‍⚕️ **Doctor Listings** (Search and filter doctors by specialization)
- 📅 **Book Appointments** (Schedule appointments with available doctors)
- 💬 **Live Chat** (Communicate with doctors for consultations)
- 📄 **Medical Records** (Upload and store health records securely)

### 🩺 Doctor Features:
- 📢 **Profile Management** (Edit details, update availability, and manage fees)
- 📆 **Appointment Scheduling** (Accept/reject appointment requests)
- 💬 **Patient Interaction** (Chat with patients for remote assistance)
- 📂 **View Patient History** (Access previous health records for better diagnosis)

### 🏥 Admin Features:
- 📊 **Dashboard Analytics** (Monitor system usage and manage users)
- ❌ **Manage Appointments** (Verify and moderate appointment requests)
- 🏷️ **User Role Management** (Assign roles to users and doctors)

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** JWT, OAuth (Google Login)
- **Hosting:** Vercel (Frontend), Railway (Backend & Database)

## 🎯 Installation & Setup

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/yourusername/healthcare-app.git
 cd healthcare-app
```

### 2️⃣ Install Dependencies
```sh
npm install  # Install backend dependencies
cd client && npm install  # Install frontend dependencies
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the App
```sh
# Start the backend
npm run dev

# Start the frontend
cd client && npm run dev
```

## 🎥 Screenshots
| Home Page | Doctor Listings | Appointment Booking |
|-----------|----------------|----------------------|
| ![Home](screenshots/home.png) | ![Doctors](screenshots/doctors.png) | ![Booking](screenshots/booking.png) |

## 📜 API Endpoints
### 📌 User Authentication
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login user
- `GET /api/auth/profile` → Fetch user details

### 📌 Doctor Management
- `GET /api/doctors` → Fetch all doctors
- `POST /api/doctors` → Add a new doctor (Admin only)

### 📌 Appointment Management
- `POST /api/appointments` → Book an appointment
- `GET /api/appointments/:id` → View appointment details

## 🛠️ Future Enhancements
- 📱 **Mobile App (React Native)**
- 🎥 **Video Consultations**
- 🤖 **AI-based Symptom Checker**
- 🌐 **Multilingual Support**

## 🤝 Contributing
1. **Fork the repo**
2. **Create a new branch** (`feature-branch`)
3. **Commit changes** (`git commit -m 'Added new feature'`)
4. **Push to GitHub** (`git push origin feature-branch`)
5. **Create a Pull Request**

## 👨‍💻 Author
**Your Name**  
📧 Email: your-email@example.com  
🔗 GitHub: [github.com/yourusername](https://github.com/yourusername)  
🔗 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
🎉 **Thank you for using Healthcare App!** 🚀
