const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api", authRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB успешно подключена!");

        app.listen(process.env.PORT, () => {
            console.log(
                `Сервер запущен на http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.error("Ошибка подключения к MongoDB:", error);
    });
