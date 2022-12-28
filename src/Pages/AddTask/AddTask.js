import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useTitle from '../../hooks/useTitle';

const AddTask = () => {
    useTitle('Add Your Task __ Daily Life');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data, event) => {
        event.preventDefault();
        const { yearOfUse, originalMobilePrice } = data;
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        try {
            fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api_key}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgData => {
                    if (imgData.success) {
                        console.log(imgData.data.url);
                        const task = {

                            taskImage: imgData.data.url,
                            completed: 'no',
                            originalMobilePrice,
                            yearOfUse

                        }
                        try {

                            fetch('http://localhost:5000/tasks', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json',
                                    // authorization: `bearer ${localStorage.getItem('accessToken')}`
                                },
                                body: JSON.stringify(task)
                            })
                                .then(res => res.json())
                                .then(result => {
                                    console.log(result);
                                    toast.success('Your task is added successfully');
                                    navigate('/my-task')
                                })
                        }
                        catch (error) {
                            console.error(error)
                        }
                    }
                })
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>

                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label for="base-input" className="block my-4 text-sm font-medium text-gray-900 dark:text-white">Task Title</label>
                    <input {...register("title", {
                        required: "title is Required"
                    })} type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />



                    {errors.title && <small className='text-red-500 mt-4'>{errors.title.message}</small>}
                </div>
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label className="label">
                        <span className="block my-4 text-sm font-medium text-gray-900 dark:text-white">Write your task/activites?</span>
                    </label>
                    <textarea rows="4" type="text" {...register("details", { required: 'task is required' })} className="w-full px-0 text-sm text-gray-900 bg-white  dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 border border-gray-300">

                    </textarea>

                    {errors.details && <small className='text-red-500 mt-4' >
                        {errors.details.message}</small>}
                </div>
                <div className="w-full max-w-xs">
                    <label className="label"> <span className="label-text">Enter your task Photo...?</span></label>
                    <input type="file" alt=' ' {...register("image", {

                    })} className="input input-bordered input-primary w-full " />
                    {errors.image && <small className='text-red-500 mt-4' >{errors.image.message}</small>}
                </div>

                <button type="submit" className="flex justify-center items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 mt-4">
                    Add task
                </button>
            </form>
            <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, you are safe on our place. See our <a href="/" className="text-blue-600 dark:text-blue-500 hover:underline">privacy policy</a>.</p>




        </div>
    );
};

export default AddTask;