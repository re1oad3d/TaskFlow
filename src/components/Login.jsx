
import { useState } from 'react';

function Login({ onLogin, onSwitchToRegister }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        onLogin(username, password);
    }

    return (
        <div className="app">

            <header className="header">
                <h1>TaskFlow</h1>
                <p>Войди в свой аккаунт</p>
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
                        Войти
                    </button>

                </form>
                <p>
                    Нет аккаунта?{' '}
                    <button type="button" className="text-button" onClick={onSwitchToRegister}>
                        Зарегистрироваться
                    </button>
                </p>

            </main>
        </div>
    );
}

export default Login;
