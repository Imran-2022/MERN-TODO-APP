import React, { useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userContext } from '../../Context/Context';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let fromm= location.state?.from?.pathname || "/show-todo"
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const onSubmit = (data) => {
        setLoggedInUser(data)
            navigate(fromm, { replace: true })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("Username", { required: true, maxLength: 20 })} placeholder="Username" />
                <input  type="password" name="Password" placeholder="Password" {...register("Password")}  />
                <input type="submit" value="LOG IN" />
            </form>
        </div>
    );
};

export default Login;