import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';


const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
             })
            .catch(err => console.log(err));
    }

    return (
        <div className='flex flex-col items-center justify-center my-20'>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl"> Please <button className="text-blue-600 dark:text-blue-500 hover:underline" onClick={handleLogOut}>Sign out</button> and logged in back!</h4>
        </div>
    );
};

export default DisplayError;