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
       <Link to={`/details/${_id}`}><p>TASKS : {title}</p></Link>
        <p>DESCRIPTION : {description}</p>
        <p>STATUS : {status}</p>
       
      </div>
        }): <div>
        <h1 style={{ textAlign: 'center', marginTop: "150px", color: "#0000009c" }}>there's no available data</h1>
      </div>:todo.length&&todo.map((todoo, idx) => {
          const {_id, title, description, status} = todoo;
      return <div key={idx}>
        <Link to={`/details/${_id}`}><p>TASKS : {title}</p></Link>
        <p>DESCRIPTION : {description}</p>
        <p>STATUS : {status}</p>
        
      </div>
        })
      }


    </div>
  );
};

export default ViewTodo;