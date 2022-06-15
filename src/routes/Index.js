import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddTodo from "../features/to-do/AddTodo";
import EditTodo from "../features/to-do/EditTodo";
import ViewTodo from "../features/to-do/ViewTodo";
import Navbar from "../layouts/Navigation/Navbar/Navbar";
import Sidebar from "../layouts/Navigation/sidebar/Sidebar";
import Error from "../pages/Error";
import Home from "../pages/Home";
const Index = () => {
    const [isopen, setisopen] = useState(false)
    const toggle = () => {
        setisopen(!isopen)
    }

    return (
        <div>
            <Navbar toggle={toggle} />
            <Sidebar isopen={isopen} toggle={toggle} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/show-todo" element={<ViewTodo />} />
                <Route path="/add-todo" element={<AddTodo />} />
                <Route path="/edit-todo" element={<EditTodo />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
};

export default Index;