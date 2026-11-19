
import { useState } from 'react';

function Register({ onRegister, onSwitchToLogin }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        onRegister(username, password);
    }

    return (
        <div className="app">

            <header className="header">
                <h1>TaskFlow</h1>
                <p>Создай аккаунт, чтобы управлять задачами</p>
            </header>

            <main className="container">

                <form className="task-form auth-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button type="submit">
                        Зарегистрироваться
                    </button>

                </form>

                <p>
                    Уже есть аккаунт?{' '}
                    <button type="button" className="text-button" onClick={onSwitchToLogin}>
                        Войти
                    </button>
                </p>

            </main>
        </div>
    );
}

export default Register;
