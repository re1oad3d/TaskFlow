
function TaskCard({ task, onDeleteTask }) {
    return (
        <div className="task-card">

            <div className="task-info">
                <h3>{task.title}</h3>

                <span>
                    {task.completed ? 'Выполнено' : 'Новая задача'}
                </span>
            </div>

            <button
                className="delete-button"
                onClick={() => onDeleteTask(task._id)}
            >
                Удалить
            </button>

        </div>
    );
}

export default TaskCard;
