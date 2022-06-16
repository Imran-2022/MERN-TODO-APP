import React, { useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userContext } from '../../Context/Context';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let fromm = location.state?.from?.pathname || "/show-todo"
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const onSubmit = (data) => {
        if (data.Password.length >= 6) {
            setLoggedInUser(data)
            navigate(fromm, { replace: true })
        } else {
            alert("password atleast 6 character")
        }
    }
    return (
        <div>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input className="w-50" {...register("Username", { required: true, maxLength: 20 })} placeholder="Username" />
                {errors.Username && <p>must have  a name</p>}
                <input className="w-50" type="password" name="Password" placeholder="Password" {...register("Password")} />
                <input type="submit" value="LOG IN" className="btn btn-primary w-50" />
            </form>
        </div>
    );
};

export default Login;