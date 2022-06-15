import React from 'react';
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
    const navigate = useNavigate();
    const handleAddTodo=()=>{
        alert("Added")
        navigate("/show-todo", { replace: true });
    }
    return (
        <div>
            <button onClick={handleAddTodo}>add Todo</button>
        </div>
    );
};

export default AddTodo;