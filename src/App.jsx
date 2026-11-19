
import { useState, useEffect } from 'react';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {

    const [user, setUser] = useState(
        localStorage.getItem('username')
    );

    const [isLogin, setIsLogin] = useState(true);

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!user) {
            setTasks([]);
            return;
        }

        async function fetchTasks() {

            try {
                setLoading(true);

                const response = await fetch(
                    `${API_URL}/tasks?username=${encodeURIComponent(user)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Не удалось загрузить задачи');
                }

                const formattedTasks = data.map(task => ({
                    ...task,
                    id: task._id
                }));

                setTasks(data);

            } catch (error) {
                console.error('Ошибка загрузки задач:', error);
                alert(error.message);

            } finally {
                setLoading(false);
            }
        }

        fetchTasks();

    }, [user]);

    async function register(username, password) {

        try {

            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка регистрации');
            }

            alert('Регистрация прошла успешно!');

            localStorage.setItem('username', data.username);
            setUser(data.username);

        } catch (error) {
            alert(error.message);
        }
    }

    async function login(username, password) {

        try {

            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка авторизации');
            }

            localStorage.setItem('username', data.username);
            setUser(data.username);

        } catch (error) {
            alert(error.message);
        }
    }

    async function addTask(title) {

        try {

            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    username: user
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Не удалось добавить задачу');
            }

            setTasks(previousTasks => [
                ...previousTasks,
                data
            ]);

        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteTask(id) {

        try {

            const response = await fetch(
                `${API_URL}/tasks/${id}?username=${encodeURIComponent(user)}`,
                {
                    method: 'DELETE'
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Не удалось удалить задачу');
            }

            setTasks(previousTasks =>
                previousTasks.filter(task => task._id !== id)
            );

        } catch (error) {
            alert(error.message);
        }
    }

    function logout() {

        localStorage.removeItem('username');

        setUser(null);
        setTasks([]);
    }

    if (!user) {

        if (isLogin) {
            return (
                <Login
                    onLogin={login}
                    onSwitchToRegister={() => setIsLogin(false)}
                />
            );
        }

        return (
            <Register
                onRegister={register}
                onSwitchToLogin={() => setIsLogin(true)}
            />
        );
    }

    return (
        <div className="app">

            <header className="header">
                <h1>TaskFlow</h1>
                <p>Твой личный список задач</p>

                <p>
                    Пользователь: <strong>{user}</strong>
                </p>

                <button 
                    className="logout-button"
                    onClick={logout}
                >
                    Выйти
                </button>
            </header>

            <main className="container">

                <TaskForm onAddTask={addTask} />

                {loading ? (
                    <p>Загрузка задач...</p>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onDeleteTask={deleteTask}
                    />
                )}

            </main>

        </div>
    );
}

export default App;