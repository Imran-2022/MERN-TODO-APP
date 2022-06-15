import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ViewTodo = () => {
  const [todo, setTodo] = useState([])
  const [search, setSearchResult] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/api/todo')
      .then(res => res.json())
      .then(data => {
        setTodo(data)
      })
  }, [])

  const handleDeleteBook = (id) => {
    if (true) {
      fetch(`http://localhost:8080/api/todo/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())// or res.text()) 
        .then(res => {
          if (res.deletedCount === 1) {
            alert(`User ${id} deleted successfully`)
            const newUser = todo.filter(ab => ab._id != id);
            setTodo(newUser)
          }
        })
    }
  }
  const [text, setText] = useState("");
  const onSubmit = evt => {
    evt.preventDefault();
    if (text === "") {
      toast("Please enter something!");
    } else {
      // alert(text);
      console.log(text)
      // setText("");
    }
  };

  const onChange = evt => setText(evt.target.value);
  useEffect(() => {
    const searchResult = todo && todo.filter(dt => dt.title.toLowerCase().includes(text.toLowerCase()) || dt.description.toLowerCase().includes(text.toLowerCase()))
    setSearchResult(searchResult)
  }, [text])
  return (

    <div>
      <form onSubmit={onSubmit} className='user-search'>
        <input
          type="text"
          name="text"
          placeholder="Search by first or last name"
          value={text}
          onChange={onChange}

        />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <button type="submit" style={{ backgroundColor: '#fff' }}>
          <AiOutlineSearch />
        </button>
      </form>
      {
        text !== ""? search.length?search.map((todo, idx) => {
          const {_id, title, description, status} = todo;
      return <div key={idx}>
        <p>TASKS : {title}</p>
        <p>DESCRIPTION : {description}</p>
        <p>STATUS : {status}</p>
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
        }): <div>
        <h1 style={{ textAlign: 'center', marginTop: "150px", color: "#0000009c" }}>there's no available data</h1>
      </div>:todo.length&&todo.map((todoo, idx) => {
          const {_id, title, description, status} = todoo;
      return <div key={idx}>
        <p>TASKS : {title}</p>
        <p>DESCRIPTION : {description}</p>
        <p>STATUS : {status}</p>
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