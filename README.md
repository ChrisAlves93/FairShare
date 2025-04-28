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

If pnpm doesn't work:

Using npm

We provide two packages of pnpm CLI, pnpm and @pnpm/exe.

pnpm is an ordinary version of pnpm, which needs Node.js to run.
@pnpm/exe is packaged with Node.js into an executable, so it may be used on a system with no Node.js installed.
npm install -g pnpm@latest-10

https://pnpm.io/installation
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
PORT=5000
FRONTEND_URL='http://localhost:5173'
```

### 4. Start the Backend Server

Start the development server:

```bash
pnpm run dev
```

If the port is already in use:

1. Find the process using the port (Lists all open Internet connections (TCP/UDP) and the processes using them):
    ```bash
    lsof -i :<PORT>
    ```

2. Kill the process by PID (Forcefully terminates a process by its PID (Process ID)):
    ```bash
    kill -9 <PID>
    ```

3. Verify the port is free:
    ```bash
    lsof -i :<PORT>
    ```
```

---

**Extra tips:**
- Replace `<PORT>` with your actual port number (e.g., `3000/5000`).
- Replace `<PID>` with the process ID shown by `lsof`.
```

### 5. Open a New Terminal: Navigate to Frontend Directory and Install Dependencies
```
cd ../frontend
pnpm install

If the same issue occurs, refer to #4
```

### 6. Setup Frontend Environment Variables
Copy the sample environment file and update it with the backend URL:
```
cp .env.sample .env
```
Then update `.env`:
```
VITE_BACKEND_URL=http://localhost:5000/api/v1
```

### 7. Start the Frontend Development Server
```
pnpm run dev
```