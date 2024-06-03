import Generate from "./Generate";
import Todo from "./Todo";
import Edit from "./Edit";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
uuidv4();

const TodoList = () =>{
    const [todoValue, setTodoValue] = useState([]);

    const createTodo = (todo) =>{
        if(todo.trim() === "") return;
        let flag = false;
        todoValue.forEach(val =>{
            if(val.task.trim() === todo.trim()) flag = true;
        })
        if(flag) return;
        setTodoValue([...todoValue, {id: uuidv4(), task: todo, isEditing: false}]);
    }
    
    const deleteTodo = (id) =>{
        setTodoValue(todoValue.filter(todo => id !== todo.id));
    }
    
    const editTodo = (id) =>{
        setTodoValue(todoValue.map(todo => id === todo.id ? {...todo, isEditing : !todo.isEditing}: todo));
    }

    const editTask = (task, id) =>{
        if(task.trim() === "") return;
        let flag = false;
        todoValue.forEach(val =>{
            if(val.task.trim() === task.trim()) flag = true;
        })
        if(flag) return;
        setTodoValue(todoValue.map( todo => id === todo.id ? {...todo, task, isEditing: !todo.isEditing} : todo));
    }


    return (
        <div className="container bg-gray-700 my-10 p-8 rounded-md w-6/12 text-center">
            <h1 className="text-3xl mb-8 font-mono text-white">Get Things Done!</h1>
            <Generate createTodo={createTodo}/>
            {todoValue.map((todo, index)=>(
                todo.isEditing ? (
                    <Edit key={index} editTodo={editTask} task={todo}/>
                ) : (
                    <Todo key={index} task={todo} editTodo={editTodo} deleteTodo={deleteTodo}/>
                )
            ))}
        </div>
    )
}

export default TodoList;