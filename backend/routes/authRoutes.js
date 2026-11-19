const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Заполните все поля"
            });
        }

        const cleanUsername = username.trim();

        if (cleanUsername.length < 3 || cleanUsername.length > 30) {
            return res.status(400).json({
                message: "Имя должно содержать от 3 до 30 символов"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Пароль должен содержать минимум 6 символов"
            });
        }

        const existingUser = await User.findOne({
            username: cleanUsername
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Пользователь уже существует"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: cleanUsername,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Регистрация успешна",
            username: newUser.username
        });

    } catch (error) {
        console.error("Ошибка регистрации:", error);

        res.status(500).json({
            message: "Ошибка регистрации"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Заполните все поля"
            });
        }

        const user = await User.findOne({
            username: username.trim()
        });

        if (!user) {
            return res.status(401).json({
                message: "Неверное имя пользователя или пароль"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Неверное имя пользователя или пароль"
            });
        }

        res.status(200).json({
            message: "Вход выполнен успешно",
            username: user.username
        });

    } catch (error) {
        console.error("Ошибка входа:", error);

        res.status(500).json({
            message: "Ошибка авторизации"
        });
    }
});

module.exports = router;