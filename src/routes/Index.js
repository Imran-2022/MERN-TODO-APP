import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Context from "../Context/Context";
import AddTodo from "../features/to-do/AddTodo";
import Details from "../features/to-do/Details";
import EditTodo from "../features/to-do/EditTodo";
import ViewTodo from "../features/to-do/ViewTodo";
import Login from "../layouts/Authentication/Login";
import PrivateRoute from "../layouts/Authentication/PrivateRoute";
import Navbar from "../layouts/Navigation/Navbar/Navbar";
import Sidebar from "../layouts/Navigation/sidebar/Sidebar";
import Error from "../pages/Error";
const Index = () => {
    const [isopen, setisopen] = useState(false)
    const toggle = () => {
        setisopen(!isopen)
    }
    return (
        <Context>
            <Navbar toggle={toggle} />
            <Sidebar isopen={isopen} toggle={toggle} />
            <Routes>
                <Route path="/" element={<PrivateRoute><ViewTodo /></PrivateRoute>} />
                <Route path="/show-todo" element={<PrivateRoute><ViewTodo /></PrivateRoute>} />
                <Route path="/add-todo" element={<PrivateRoute><AddTodo /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/details/:abc" element={<PrivateRoute><Details /></PrivateRoute>} />
                <Route path="/edit-todo" element={<PrivateRoute><EditTodo /></PrivateRoute>} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Context>
    );
};

export default Index;