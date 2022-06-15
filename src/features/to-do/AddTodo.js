import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useForm } from "react-hook-form";
const AddTodo = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        data.status=false;
        axios.post('http://localhost:8080/api/todo', data)
            .then(res => {
                if (res.data) {
                    alert("data added successfully !!!");
                    reset()
                    navigate("/show-todo", { replace: true });
                }
            })
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title", { required: true, maxLength: 20 })} placeholder="title" />
                <input  {...register("description")} placeholder="description" />
                <input type="submit" value="add Data" />
            </form>
        </div>
    );
};

export default AddTodo;