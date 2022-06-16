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
  const [filterblood, setFilterBlood] = useState([])
  const [text, setText] = useState("");

  const onChange = evt => setText(evt.target.value);
  useEffect(() => {
    const searchResult = todo && todo.filter(dt => dt.title.toLowerCase().includes(text.toLowerCase()))
    // || dt.description.toLowerCase().includes(text.toLowerCase())
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
          }
          // else {
          //   alert('nothing change')
          // }
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
        if (res.data.deletedCount) {
          alert(res.data.deletedCount)
          const newTODO = todo.filter((item) => {
            return item.status == false;
          })
          console.log(newTODO)
          setTodo(newTODO)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  // filter todo . 

  const filterImage = (fimage) => {
    console.log(fimage)
    setFilterBlood(todo)
    if (fimage === "ALL") {
      setFilterBlood(todo)
    }
    if (fimage == 2) {
      setFilterBlood(todo.filter((x) => {
        return Boolean(x.status) === Boolean(false);
      }))

    }
    if (fimage == 1) {
      setFilterBlood(todo.filter((x) => {
        return Boolean(x.status) == Boolean(true);
      }))

    }
  }

  console.log(filterblood)
  return (

    <div className="p-5">
      <div className="filterTodo">
        <Link to="/add-todo" className="btn btn-primary">ADD TO DO</Link>

        <form className='user-search my-4'>
          <input
            type="text"
            name="text"
            placeholder="Search by first or last name"
            value={text}
            onChange={onChange}

          />

        </form>
        <button className="w-25 btn btn-primary my-5" onClick={handleAllDelete}>delete Completed Task</button>
        <div className="catagories py-5 ms-5">
          <label for="todoFilter">Filter : &nbsp;</label>
          <select id="todoFilter" name="todoFilter" onChange={(e) => filterImage(e.target.value)}>
            <option selected="selected" value="ALL">ALL</option>
            <option value={1}>COMPLETED</option>
            <option value={2}>ACTIVE</option>
          </select>
        </div>
      </div>
      {

        filterblood.length ? <table className="w-75 m-auto my-5">
          <thead>
            <tr>
              <th>NO</th>
              <th>TASKS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          {filterblood.map((todo, idx) => {
            const { _id, title, description, status } = todo;
            return <>
              <tbody key={idx}>
                <tr>
                  <td>{idx + 1}</td>
                  <td><Link className="Link" to={`/details/${_id}`}><p>{title}</p></Link></td>
                  <td><input type="checkbox" defaultChecked={status} onClick={() => {
                    onClick(_id)
                  }} /> {!status ? "active" : "completed"}</td>
                </tr>
              </tbody>
            </>
          })}
        </table> : todo.length && <table className="w-75 m-auto my-5">
          <thead>
            <tr>
              <th>NO</th>
              <th>TASKS</th>
              <th>STATUS</th>
            </tr>
          </thead>

          {
            text !== "" ? search.length ? search.map((todo, idx) => {
              const { _id, title, description, status } = todo;
              return <>
                <tbody key={idx}>
                  <tr>
                    <td>{idx + 1}</td>
                    <td><Link className="Link" to={`/details/${_id}`}><p>{title}</p></Link></td>
                    <td><input type="checkbox" defaultChecked={status} onClick={() => {
                      onClick(_id)
                    }} /> {!status ? "active" : "completed"}</td>
                  </tr>
                </tbody>
              </>
            }) : <div>
              <h1 style={{ textAlign: 'center', marginTop: "150px", color: "#0000009c" }}>there's no available data</h1>
            </div> : todo.length && todo.map((todoo, idx) => {
              const { _id, title, description, status } = todoo;
              return <>
                <tbody key={idx}>
                  <tr>
                    <td>{idx + 1}</td>
                    <td><Link className="Link" to={`/details/${_id}`}><p>{title}</p></Link></td>
                    <td><input type="checkbox" defaultChecked={status} onClick={() => {
                      onClick(_id)
                    }} /> {!status ? "active" : "completed"}</td>
                  </tr>
                </tbody>

              </>
            })
          }
        </table>
      }

    </div>
  );
};

export default ViewTodo;