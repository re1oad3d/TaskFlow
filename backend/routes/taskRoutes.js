
const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.get("/", async (req, res) => {
    try {
        const { username } = req.query;

        if (!username || !username.trim()) {
            return res.status(400).json({
                message: "Не указано имя пользователя"
            });
        }

        const tasks = await Task.find({
            username: username.trim()
        });

        res.status(200).json(tasks);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Ошибка получения задач"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, username } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Название задачи обязательно"
            });
        }

        if (!username || !username.trim()) {
            return res.status(400).json({
                message: "Не указано имя пользователя"
            });
        }

        const newTask = new Task({
            title: title.trim(),
            username: username.trim()
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Ошибка создания задачи"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { username } = req.query;

        if (!username || !username.trim()) {
            return res.status(400).json({
                message: "Не указано имя пользователя"
            });
        }

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                username: username.trim()
            },
            {
                completed: req.body.completed
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Задача не найдена"
            });
        }

        res.status(200).json(updatedTask);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Ошибка обновления задачи"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { username } = req.query;

        if (!username || !username.trim()) {
            return res.status(400).json({
                message: "Не указано имя пользователя"
            });
        }

        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            username: username.trim()
        });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Задача не найдена"
            });
        }

        res.status(200).json({
            message: "Задача успешно удалена"
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Ошибка удаления задачи"
        });
    }
});

module.exports = router;