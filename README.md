# 📝 Task Management System

A full-stack Task Management application designed to help users efficiently organize, track, and manage their daily tasks. This project follows a clean architecture with a React-based frontend and a robust Spring Boot backend.

---

## 🎥 Demo

🔗 **Watch Demo Video:**
[Demo](https://github.com/Trishita12345/TaskManagementSystem_UI/blob/main/Screen%20Recording%202026-04-24%20at%204.27.06%E2%80%AFPM.mov), 
[Swagger UI](https://github.com/Trishita12345/TaskManagementSystem_UI/blob/main/Screen%20Recording%202026-04-24%20at%204.53.27%E2%80%AFPM.mov)

> 📌 Open the link to see the application workflow including task creation, updates, and management.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup)
* 📝 Create, Update, Delete Tasks
* 📌 Task Prioritization & Status Tracking
* 📅 Deadline / Due Date Management
* 🔍 Search & Filter Tasks
* 📊 Organized task view for better productivity
* 🌐 RESTful API integration
* 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React.js
* 🎨 CSS / Bootstrap / Tailwind (update if needed)
* 🔄 Axios for API calls

### Backend

* ☕ Spring Boot
* 🌐 REST API (Spring MVC)
* 🗄️ PostgreSQL
* 🔐 Spring Security (JWT-based Authentication)
* 📄 Swagger (API Documentation)

### DevOps & Tools

* 🔄 CI/CD Pipeline (configured)
* 🐙 Git & GitHub
* ☁️ AWS (planned deployment)

---

## 📁 Project Structure

```
TaskManagementSystem_UI/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
├── public/
└── package.json

Task-management-backend/
├── controller/
├── service/
├── repository/
├── model/
├── config/
└── application.properties
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repositories

```bash
git clone https://github.com/Trishita12345/TaskManagementSystem_UI.git
git clone https://github.com/Trishita12345/Task-management-backend.git
```

---

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd Task-management-backend
```

Update `application.properties`:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/your_db
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run the backend:

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

### 3️⃣ Frontend Setup

```bash
cd TaskManagementSystem_UI
npm install
npm start
```

---

## 📄 API Documentation (Swagger)

Once the backend is running, access Swagger UI at:

```
http://localhost:8080/swagger-ui/index.html
```

> 📌 Use Swagger to explore and test all API endpoints interactively.

---

## 🔗 API Overview

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Authenticate user
* `GET /api/tasks` → Get all tasks
* `POST /api/tasks` → Create task
* `PUT /api/tasks/{id}` → Update task
* `DELETE /api/tasks/{id}` → Delete task

---

## 🔄 CI/CD Pipeline

* CI/CD pipeline is configured for automated builds and integration.
* Supports future deployment workflows.
* Ready for integration with cloud platforms like AWS.

> 🚧 Note: Deployment to AWS is planned but not currently active.

---

## 💡 Key Highlights

* Clean full-stack architecture (React + Spring Boot)
* Secure authentication with JWT
* Scalable backend with layered architecture
* PostgreSQL for reliable data persistence
* Integrated API documentation using Swagger
* CI/CD-ready project setup

---

## 🚀 Future Enhancements

* ☁️ AWS Deployment (EC2 / S3 / RDS)
* 🔔 Notifications & reminders
* 📊 Dashboard & analytics
* 👥 Team collaboration features
* 🌙 Dark mode UI

---

## 👩‍💻 Author

**Trishita**
🔗 GitHub: [https://github.com/Trishita12345](https://github.com/Trishita12345)

---

## 📄 License

This project is licensed under the MIT License.

---
