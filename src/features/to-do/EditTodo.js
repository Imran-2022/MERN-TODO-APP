import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const EditTodo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {_id, title, description, status}=location.state
    // 
    const [user, setUser] = useState({ title: title, description: description, status:status});


    const handleTitleChange = (e) => {
        const updatedName = e.target.value;
        const updatedUser = { title: updatedName, description: user.description,status: user.status}
        setUser(updatedUser)
    }

    const handleDescriptionChange = (e) => {
        const updatedEmail = e.target.value;
        const updatedUser = { ...user }
        updatedUser.description = updatedEmail;
        setUser(updatedUser)
    }
    const handleStatusChange = (e) => {
        const updatedEmail = e.target.value;
        const updatedUser = { ...user }
        updatedUser.status = updatedEmail;
        setUser(updatedUser)
    }
    const handleUpdate = (e) => {
        const url = `http://localhost:8080/api/todo/${_id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    alert('Updated')
                    // setUser({})
                    navigate("/show-todo", { replace: true });
                }else{
                    alert('nothing change')
                }
            })

        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <input type="text" onChange={handleTitleChange} value={user.title || ""} />
                <input type="text" onChange={handleDescriptionChange} value={user.description || ""} />
                <input type="text" onChange={handleStatusChange} value={user.status || ""} />
                <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default EditTodo;