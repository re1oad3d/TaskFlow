
import { useState } from 'react';

function TaskForm({ onAddTask }) {

    const [title, setTitle] = useState('');

    function handleSubmit(event) {

        event.preventDefault();

        const trimmedTitle = title.trim();

        if (trimmedTitle === '') {
            return;
        }

        onAddTask(trimmedTitle);

        setTitle('');
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Например, изучить React..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <button type="submit">
                Добавить задачу
            </button>

        </form>
    );
}

export default TaskForm;