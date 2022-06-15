import React, { useContext } from 'react';
import { useLocation ,Navigate } from 'react-router-dom';
import { userContext } from '../../Context/Context';

const PrivateRoute = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const location = useLocation();
    if(!loggedInUser.Username) {
        return <Navigate to="/login" state={{from:location}} replace/>;
    }
    return children;
};

export default PrivateRoute;