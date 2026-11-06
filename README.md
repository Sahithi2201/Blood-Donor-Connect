# 🩸 Blood Donor Connect

**A MERN Stack Based Blood Donor Management Web Application**

Blood Donor Connect is a web application developed to connect blood donors with people who need blood. It provides a common platform where users can register as donors, search for donors based on blood group and city, and submit and manage blood requests.

The main goal of this project is to make finding blood donors easier and help people connect during emergency situations.

## 🚀 Features

- **User Registration:** Users can create an account.
- **User Login:** Secure login functionality.
- **Donor Registration:** Users can register themselves as blood donors.
- **Find Donors:** Search for donors based on blood group and city.
- **Blood Requests:** Submit blood requests.
- **Request Management:** View, update, and delete blood requests.
- **Dashboard:** Access important application information in one place.
- **Database Integration:** Store and retrieve application data using MongoDB.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development and build tool |
| Node.js | Backend runtime environment |
| Express.js | Backend framework and API development |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JavaScript | Application functionality |
| JWT | User authentication |
| CSS | Styling |
| Git & GitHub | Version control and source code management |
| Render | Backend deployment |
| Vercel | Frontend deployment |

## 📁 Project Structure

```text
Blood-Donor-Connect/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

*Note: Folder names may vary depending on the final project structure.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sahithi2201/Blood-Donor-Connect.git
```

### 2. Navigate to the Project Folder

```bash
cd Blood-Donor-Connect
```

### 3. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and configure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Start the backend server:

```bash
node server.js
```

Backend runs locally at:

`http://localhost:5000`

### 4. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs locally at:

`http://localhost:5173`

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/donors` | Retrieve donors |
| GET | `/api/donors/search` | Search donors |
| POST | `/api/donors/register` | Register a donor |
| GET | `/api/blood-requests` | Retrieve blood requests |

Additional endpoints support updating and deleting blood requests and donor records.

## 🔄 Project Workflow

1. User opens the Blood Donor Connect application.
2. User signs up or logs in.
3. User accesses the dashboard.
4. User can register as a donor or search for existing donors.
5. User can submit and manage blood requests.
6. Frontend sends API requests to the backend.
7. Backend processes requests and communicates with MongoDB.
8. The application displays the response to the user.

## ☁️ Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas



## 🎯 Future Enhancements

- Real-time donor availability updates.
- Location-based donor searching.
- Email or SMS notifications.
- Donor verification system.
- Improved emergency blood request management.

## 📌 Conclusion

Blood Donor Connect provides a platform to connect blood donors and people in need of blood. This project demonstrates the use of full-stack web development concepts using the MERN stack.

##Author
K.Sahithi
