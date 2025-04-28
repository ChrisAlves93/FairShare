# FairShare

#### A payment platform facilitating user sign-up, seamless peer-to-peer transactions, and efficient user search functionalities for easy money transfers.

---

## 🛠️ Technologies Used
- React
- TypeScript
- Shadcn (Tailwind CSS)
- Node.js
- Express.js
- MongoDB
- Zod

---

## 🚀 Project Setup

### 1. Clone the Repository
```
git clone your-repository-url
```

### 2. Navigate to the Project Directory and Install Backend Dependencies
```
cd FairShare/backend
pnpm install
```

### 3. Setup Backend Environment Variables
Copy the sample environment file and update it with your MongoDB credentials:
```
cp .env.sample .env
```
Then update `.env`:
```
MONGO_URL=your-mongodb-url
JWT_SECRET=your-secret-key
PORT=3000
FRONTEND_URL='http://localhost:5173'
```

### 4. Start the Backend Server
```
pnpm run dev
```

### 5. Open a New Terminal: Navigate to Frontend Directory and Install Dependencies
```
cd ../frontend
pnpm install
```

### 6. Setup Frontend Environment Variables
Copy the sample environment file and update it with the backend URL:
```
cp .env.sample .env
```
Then update `.env`:
```
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

### 7. Start the Frontend Development Server
```
pnpm run dev
```
