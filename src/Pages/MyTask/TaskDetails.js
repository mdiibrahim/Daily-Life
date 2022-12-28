import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
const TaskDetails = () => {
    const task = useLoaderData();
    const navigate = useNavigate();
    const { taskImage, title, details, _id } = task;
    const handleDeleteTask = (id) => {
        fetch(`http://localhost:5000/tasks/my-tasks/${id}`, {
            method: 'Delete',
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    
                    toast.success('Successfully deleted the task.')
                    navigate('/my-task');
                }
            })
    }
    const handleCompletedTask = (id) => {
        try {
            axios.put(`http://localhost:5000/tasks/${id}`, {
                completed: 'yes'
            })
                .then(res => {
                    console.log(res)

                    if (res.data.matchedCount > 0) {
                    
                        toast.success('Successfully verified the seller.');
                        navigate('/completed-tasks')
                    }

                })
        } catch (error) {
            console.log(error)
        }
    }
    const handleEditTask = () => {
        
    }
    return (
        <div>

            <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={taskImage} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{details}</p>
                    <div className='grid grid-cols-3 gap-2'>
                    <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>handleDeleteTask(_id)}>Delete</button>
                    <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=> handleCompletedTask(_id)}>Completed</button>
                    <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleEditTask}>Edit</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TaskDetails;