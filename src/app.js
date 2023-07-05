import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import routerAuth from "./microservices/auth/routes/authRoute.js";
import { PORT } from "./utils/constants.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    app.use("/api/auth", routerAuth);
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
