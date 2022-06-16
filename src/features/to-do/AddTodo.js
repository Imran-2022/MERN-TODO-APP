import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useForm } from "react-hook-form";
const AddTodo = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        data.status = false;

        axios.post('https://powerful-citadel-69552.herokuapp.com/api/todo', data)
            .then(res => {
                if (res.data) {
                    alert("data added successfully !!!");
                    reset()
                    navigate("/show-todo", { replace: true });
                }
            })

    }

    return (
        <div className="m-5 p-5">
            <form className="d-flex form-add flex-column gap-1 w-50" onSubmit={handleSubmit(onSubmit)}>
                <input className='w-100' {...register("title", { required: true, maxLength: 50 })} placeholder="title" autoFocus={true} />
                {errors.title && <p>must have  a title with max length of 50 chars</p>}
                <textarea rows="4" cols="50"  {...register("description", { required: true, maxLength: 256 })} placeholder="description" />
                {errors.description && <p>description has a max length of 256 chars</p>}
                <input className='w-100 btn btn-primary' type="submit" value="ADD TODO" />
            </form>
        </div>
    );
};

export default AddTodo;