import Task from './Task'

//map will create a list by taking in a function
//map requires us to include a unique key prop used to identify elements
const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
        <>
            {tasks.map( 
                (task) => ( <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} /> )
                //(task, index) => ( <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} /> )
            )}
        </>
    )
}

export default Tasks
