import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewTodo = () => {
  const id = 1;
  const title = "this is tite"
  const author = "this is author"
 
  // http://localhost:8080/api/todo
  const [todo, setTodo] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/api/todo')
      .then(res => res.json())
      .then(data => {
        setTodo(data)
      })
  }, [])

  const handleDeleteBook = (id) => {
    if(true){
      fetch(`http://localhost:8080/api/todo/${id}`, {
          method: 'DELETE',
        })
        .then(res => res.json())// or res.text()) 
        .then(res => {
            if(res.deletedCount===1)
            {
                alert(`User ${id} deleted successfully`)
                const newUser = todo.filter(ab=>ab._id !=id);
                setTodo(newUser)
            }
        })
  }
  }
  return (

    <div>
      {
        todo.map((todo, idx) => {
          const { _id, title, description, status } = todo;
          return <div key={idx}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{status}</p>
            <Link to="/edit-todo" state={{ _id, title, description, status }}>
              <button>Edit</button>
            </Link>
            <button
              onClick={() => {
                handleDeleteBook(_id);
              }}
            >
              Delete
            </button>
          </div>
        })
      }


    </div>
  );
};

export default ViewTodo;