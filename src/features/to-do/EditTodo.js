import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const EditTodo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState(location.state.id);
    const [title, setTitle] = useState(location.state.title);
    const [author, setAuthor] = useState(location.state.author);
    const handleEditBook=()=>{
        navigate("/show-todo", { replace: true });
    }
    return (
        <div>
            <p>{id}</p>
            <p>{title}</p>
            <p>{author}</p>
            <button onClick={handleEditBook}>Edit  to do</button>
        </div>
    );
};

export default EditTodo;