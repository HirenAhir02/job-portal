import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js'

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://job-portal-ui-psi.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/meet", (req, res) => {
  res.send("hii meet");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Start server AFTER MongoDB connects
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect DB", err.message);
    process.exit(1); // Exit process if DB fails
  }
};

startServer();
