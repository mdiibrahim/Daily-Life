import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../contexts/AuthProvider';

const MyTask = () => {
    useTitle('Check Your Task __ Daily Life');
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/tasks/${user?.email}`)
            .then(res => res.json())
            .then(data=>setTasks(data))
    },[user?.email])
    return (
        <div>
            <div>
                <h2 className='mt-4 p-6 text-3xl text-center font-semibold'>My  tasks:</h2>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2'>

                    {
                        tasks.map(task => {
                            return (
                                <div key={task._id}>
                

                                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        
                                            <img className="rounded-t-lg" src={task.taskImage} alt="" />
                                        
                                        <div className="p-5">
                                            
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ task.title}</h5>
                                            
                                            
                                            <Link to={`/tasks/my-tasks/${task._id}`}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Show the task
                                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default MyTask;