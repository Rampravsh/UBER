import mongoose from "mongoose";
import dns from "node:dns";

// Workaround: Force Node.js to use Google's DNS for SRV resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

function connectToDB() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error("Failed to connect to DB:", err.message);
    });
}

export default connectToDB;
