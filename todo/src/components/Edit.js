import { useState } from "react";

const Edit = ({editTodo, task}) =>{
    const [value, setValue] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        editTodo(value, task.id);
        setValue("")
    }
    return (
        <form className="mb- font-primary w-full" onSubmit={handleSubmit}>
            <input type="text" className="outline-none bg-transparent border border-gray-500 w-[465px] py-3 px-3
            text-white mb-1 rounded placeholder:text-gray-300" placeholder={value}
            onChange={(e)=>{
                setValue(e.target.value);
            }}
            value={value}
            />
            <button className="bg-gray-500 border-none p-2 py-3 text-white cursor-pointer rounded ml-2">Update Task</button>
        </form>
    )
}

export default Edit;