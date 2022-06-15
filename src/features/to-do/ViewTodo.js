import React from 'react';
import { Link } from 'react-router-dom';

const ViewTodo = () => {
    const id=1;
    const title="this is tite"
    const author="this is author"
    const handleDeleteBook=() => {
        console.log(id)
    }
    return (

        <div>
             <Link to="/edit-todo" state={{ id, title, author }}>
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => {
                        handleDeleteBook(id);
                      }}
                    >
                      Delete
                    </button>
        </div>
    );
};

export default ViewTodo;