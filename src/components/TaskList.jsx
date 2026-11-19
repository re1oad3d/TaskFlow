
import TaskCard from './TaskCard';

function TaskList({ tasks, onDeleteTask }) {

    return (
        <section className="task-section">

            <h2>Мои задачи</h2>

            {tasks.length === 0 ? (

                <p className="empty-message">
                    Пока задач нет. Добавь свою первую задачу!
                </p>

            ) : (

                <div className="task-list">

                    {tasks.map(task => (

                        <TaskCard
                            key={task._id}
                            task={task}
                            onDeleteTask={onDeleteTask}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}

export default TaskList;
