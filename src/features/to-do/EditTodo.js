import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const EditTodo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { _id, title, description, status } = location.state
    // 
    const [user, setUser] = useState({ title: title, description: description, status: status });


    const handleTitleChange = (e) => {
        const updatedName = e.target.value;
        const updatedUser = { title: updatedName, description: user.description, status: user.status }
        setUser(updatedUser)
    }

    const handleDescriptionChange = (e) => {
        const updatedEmail = e.target.value;
        const updatedUser = { ...user }
        updatedUser.description = updatedEmail;
        setUser(updatedUser)
    }

    const handleUpdate = (e) => {
        const url = `https://powerful-citadel-69552.herokuapp.com/api/todo/${_id}`;
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
                    navigate(`/details/${_id}`, { replace: true });
                } else {
                    alert('nothing change')
                }
            })

        e.preventDefault()
    }

    return (
        <div className="m-5 p-5">
            <form className="d-flex form-add flex-column gap-1 w-50" onSubmit={handleUpdate}>
                <input className='w-100' type="text" onChange={handleTitleChange} value={user.title || ""} />
                <textarea rows="4" cols="50" onChange={handleDescriptionChange} value={user.description || ""} />
                <input className='w-100 btn btn-primary' type="submit" value="UPDATE TODO" />
            </form>
        </div>
    );
};

export default EditTodo;