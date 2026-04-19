import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
connectToDB();

app.use(
  cors({
    origin: true, // true set karne se ye har aane wale origin ko dynamically whitelist kar dega
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
