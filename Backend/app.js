import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app = express();
connectToDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello World");
});
app

export default app;
