import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios').default;
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
  const [id, setId] = useState("")

  const [text, setText] = useState("");

  const onChange = evt => setText(evt.target.value);
  useEffect(() => {
    const searchResult = todo && todo.filter(dt => dt.title.toLowerCase().includes(text.toLowerCase()) || dt.description.toLowerCase().includes(text.toLowerCase()))
    setSearchResult(searchResult)
  }, [text])

  useEffect(() => {
    if (id) {
      const data = todo.filter(dt => dt._id == id)
      const url = `http://localhost:8080/api/todo/${id}`;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(...data),
      })
        .then(response => response.json())
        .then(result => {
          if (result.modifiedCount) {
            alert("status updated")
          } else {
            alert('nothing change')
          }
        })
    }


  }, [todo])

  const onClick = (id) => {
    setId(id)
    setTodo(
      todo.map((item) => {
        return item._id === id ? { ...item, status: !item.status } : item
      }
      )
    );
  };

  const handleAllDelete = () => {
    axios.delete('http://localhost:8080/api/todo')
      .then(res => {
        console.log('request here ', res.data.deletedCount);
        if(res.data.deletedCount){
          alert(res.data.deletedCount)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  return (

    <div className="p-5">
      <form className='user-search my-4'>
        <input
          type="text"
          name="text"
          placeholder="Search by first or last name"
          value={text}
          onChange={onChange}

        />

      </form>
      <button className="w-25 btn btn-primary" onClick={handleAllDelete}>delete Completed Task</button>
      {
        text !== "" ? search.length ? search.map((todo, idx) => {
          const { _id, title, description, status } = todo;
          return <div className="p-2 d-flex gap-5" key={idx}>
            <Link className="Link" to={`/details/${_id}`}><p>TASKS : {title}</p></Link>
            {/* <p>DESCRIPTION : {description}</p> */}
            <p>STATUS : <input type="checkbox" defaultChecked={status} onClick={() => {
              onClick(_id)
            }} /> {!status ? "active" : "completed"}</p>

          </div>
        }) : <div>
          <h1 style={{ textAlign: 'center', marginTop: "150px", color: "#0000009c" }}>there's no available data</h1>
        </div> : todo.length && todo.map((todoo, idx) => {
          const { _id, title, description, status } = todoo;
          return <div className="p-2 d-flex gap-5" key={idx}>
            <Link className="Link" to={`/details/${_id}`}><p>TASKS : {title}</p></Link>
            {/* <p>DESCRIPTION : {description}</p> */}
            <p>STATUS : <input type="checkbox" defaultChecked={status} onClick={() => {
              onClick(_id)
            }} /> {!status ? "active" : "completed"}</p>

          </div>
        })
      }


    </div>
  );
};

export default ViewTodo;