import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import http from "http";
import { PORT } from "./utils/constants.js";
import routerAuth from "./microservices/auth/routes/authRoute.js";
import routerComment from "./microservices/commets/routes/commentRoute.js";
import setupSocket from "./config/socket.js";
import graphql from "./graphql/index.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    app.use("/api/auth", routerAuth);
    app.use("/api/comment", routerComment);
    app.use("/graphql", graphql);

    setupSocket(server); // Configurar Socket.IO

    server.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
