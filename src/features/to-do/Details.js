import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
const Details = () => {
    const { abc } = useParams()
    const navigate = useNavigate();

    const [todo, setTodo] = useState({})
    useEffect(() => {
        fetch(`https://powerful-citadel-69552.herokuapp.com/api/todo/${abc}`)
            .then(res => res.json())
            .then(data => {
                setTodo(data)
            })
    }, [])
    const { description, status, title, _id } = todo
    const handleDeleteBook = (id) => {
        if (true) {
            fetch(`https://powerful-citadel-69552.herokuapp.com/api/todo/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())// or res.text()) 
                .then(res => {
                    if (res.deletedCount === 1) {
                        alert(`User ${id} deleted successfully`)
                        navigate("/show-todo", { replace: true });
                    }
                })
        }
    }
    return (
        <>
            {
                todo._id ? <div className="m-5 p-5 loadingbtn">
                    <p>TITLE : {title}</p>
                    <p>DESCRIPTION : {description}</p>
                    {/* <p>id : {_id}</p> */}
                    <div>
                        <button className="btn btn-primary me-4"
                            onClick={() => {
                                handleDeleteBook(_id);
                            }}
                        >
                            Delete
                        </button>
                        <Link to="/edit-todo" state={{ _id, title, description, status }}>
                            <button className="btn btn-primary">Edit</button>
                        </Link>
                    </div>

                </div> : <div className="loadingbtn">
                    <Button variant="primary" className="w-25" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>
                </div>
            }

        </>


    );
};

export default Details;