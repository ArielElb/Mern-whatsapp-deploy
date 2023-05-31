const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const socket = require("./services/SocketService.js");

const app = express();
const server = require("http").createServer(app);
socket.init(server);

app.use(
  cors({
    origin: "https://whatsapp-ap2-mern.onrender.com",
  })
);

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("MongoDB connection error:", error));

// use /api/ to access the routes

const loginRouter = require("./routes/loginRoutes");
app.use("/api/Tokens", loginRouter);

const userRouter = require("./routes/userRoutes");
app.use("/api", userRouter);

const chatRouter = require("./routes/chatRoutes");
app.use("/api/Chats", chatRouter);

const messageRouter = require("./routes/messageRoutes");
app.use("/api/Chats/", messageRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
