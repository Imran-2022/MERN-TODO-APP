import React from "react";
import { Routes, Route } from "react-router-dom";
import AddTodo from "../features/to-do/AddTodo";
import EditTodo from "../features/to-do/EditTodo";
import ViewTodo from "../features/to-do/ViewTodo";
import Navbar from "../layouts/Navbar";
import Error from "../pages/Error";
import Home from "../pages/Home";
const Index = () => {
    return (
        <div>
      <Navbar />
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