import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditTaskModal from './EditTaskModal/EditTaskModal';

import { Button } from 'flowbite-react';
const TaskDetails = () => {
    const task = useLoaderData();
    const navigate = useNavigate();
    const { taskImage, title, details, _id, completed } = task;
    const [editTask, setEditTask] = useState(false);
    const handleDeleteTask = (id) => {
        fetch(`https://daily-life-server-side.vercel.app/tasks/my-tasks/${id}`, {
            method: 'Delete',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                    toast.success('Successfully deleted the task.')
                    navigate('/my-tasks');
                }
            })
    }
    const handleCompletedTask = (id) => {
        try {
            axios.put(`https://daily-life-server-side.vercel.app/tasks/${id}`, {
                completed: 'yes'
            })
                .then(res => {
                    console.log(res)

                    if (res.data.matchedCount > 0) {

                        toast.success('Successfully completed the task.');
                        navigate('/completed-tasks')
                    }

                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section>

            <h2 className='mt-4 p-6 text-3xl text-center font-semibold'>My {title} task:</h2>
            <div className='flex justify-center items-center my-16'>
                <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row lg:w-9/12 w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48  md:rounded-none md:rounded-l-lg" src={taskImage} alt="" />
                    <div className="flex flex-col justify-between w-full p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                        <p id='details' className="mb-3 font-normal text-gray-700 dark:text-gray-400">{details}</p>
                        <div className='grid sm:grid-cols-3 gap-2'>
                            <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDeleteTask(_id)}>Delete</button>
                            {
                                completed === 'no' ? <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleCompletedTask(_id)}>Complete</button> :
                                    <button disabled className="mt-4 text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => handleCompletedTask(_id)}>Completed</button>
                            }


                            <Button onClick={() => setEditTask(true)} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Update
                            </Button>
                            {
                                editTask && <EditTaskModal
                                    task={task}
                                    setEditTask={setEditTask}
                                    editTask={editTask}
                                ></EditTaskModal>
                            }






                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default TaskDetails;