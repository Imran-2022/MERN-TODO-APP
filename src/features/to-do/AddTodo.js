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
        <div  className="m-5 p-5">
            <form className="d-flex form-add flex-column gap-1 w-50" onSubmit={handleSubmit(onSubmit)}>
                <input className='w-100' {...register("title", { required: true, maxLength: 20 })} placeholder="title"  autoFocus={true}/>
                <textarea rows="4" cols="50"  {...register("description")} placeholder="description" />
                <input className='w-100 btn btn-primary' type="submit" value="ADD TODO" />
            </form>
        </div>
    );
};

export default AddTodo;