import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import employerRoutes from "./routes/employer.routes.js";
import managerRoutes from "./routes/manager.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/",(req,res)=>{
//   res.send('bienvenu')});

app.use("/api/auth", authRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/manager", managerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
