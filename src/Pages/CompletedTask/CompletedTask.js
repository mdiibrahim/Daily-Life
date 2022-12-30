import React, { useContext } from 'react';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CompletedTask = () => {
    
    useTitle('Your Completed Task __ Daily Life');
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { data: completedTasks = [], refetch } = useQuery({
        queryKey: ['completedTasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/completed-tasks/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteCompletedTask = (id) => {
        fetch(`http://localhost:5000/tasks/my-tasks/${id}`, {
            method: 'Delete',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                    toast.success('Successfully deleted the task.')
                    refetch();
                }
            })
    }
    const handleNotCompletedTask = (id) => {
        try {
            axios.put(`http://localhost:5000/tasks/${id}`, {
                completed: 'no'
            })
                .then(res => {
                    console.log(res)

                    if (res.data.matchedCount > 0) {

                        toast.error('not completed.');
                        navigate('/my-tasks')
                    }

                })
        } catch (error) {
            console.log(error)
        }
    }
    const handleComment = (id) => {
        
        const comment = document.getElementById('comment-input').value;

        
        try {

            axios.put(`http://localhost:5000/completed-tasks/${id}`, {

                comments:comment,
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(res => {
                console.log(res)

                if (res.data.matchedCount > 0) {

                    toast.success('comment completed.');
                    refetch();
                }

            })
    } catch (error) {
        console.log(error)
    }
}
    return (
        <div>
            <h1 className='text-center text-2xl text-bold text-primary mt-1'>My Completed tasks:</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {
                    completedTasks.map(completedTask => {
                        return (
                            <div className="flex flex-col items-center   bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" key={completedTask._id}>
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={completedTask.taskImage} alt="" />
                                <div className="flex flex-col w-full justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{completedTask.title}</h5>
                                    <p className="mb-3  font-normal text-gray-700 dark:text-gray-400">{completedTask.details}</p>
                                    {
                                        completedTask.comments?.map((comment,idx) => <small key={idx} className="mb-3  font-normal text-gray-700 dark:text-gray-400">{comment}</small> )
                                    }
                                    
                                    <div className='flex w-full justify-between gap-2'>
                                        <button className="mt-8  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDeleteCompletedTask(completedTask._id)}>Delete</button>
                                        <button className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleNotCompletedTask(completedTask._id)}>Incomplete</button>
                                    </div>
                                    <div  className='flex justify-between my-4 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600'>


                                            <input  type="text" id="comment-input" placeholder='add a comment' className=" w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-10 mt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " />

                                            <button type='submit' onClick={()=>handleComment(completedTask._id)}  className="w-1/3 mt-4 inline text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Add Comment</button>
                                       
                                    </div>
                                </div>
                            </div>)

                    })
                }
            </div>
        </div>
    );
};

export default CompletedTask;