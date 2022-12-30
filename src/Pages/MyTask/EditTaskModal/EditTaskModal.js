
import React from 'react';
import { Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const EditTaskModal = ({ task, editTask, setEditTask }) => {
    const { taskImage, title, details, _id } = task;

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data, event) => {
        event.preventDefault();
        const { title, details } = data;

        const image = data?.image[0];
        const formData = new FormData();
        formData.append('image', image);
        if (image) {

            try {
                fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api_key}`, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(imgData => {
                        if (imgData.success) {
                            console.log(imgData.data.url);
                            try {

                                axios.put(`https://daily-life-server-side.vercel.app/update-tasks/${_id}`, {

                                    headers: {
                                        'content-type': 'application/json',
                                        // authorization: `bearer ${localStorage.getItem('accessToken')}`
                                    },
                                    details: details,
                                    title: title,
                                    taskImage: imgData.data.url,
                                })
                                    .then(res => {
                                        console.log(res)

                                        if (res.data.matchedCount > 0) {

                                            toast.success('Successfully updated the task.');
                                            setEditTask(false)
                                        }

                                    })
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    })
            }

            catch (error) {
                console.error(error)
            }

        }
        else {
            try {

                axios.put(`https://daily-life-server-side.vercel.app/update-tasks/${_id}`, {
                    headers: {
                        'content-type': 'application/json',
                        // authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    details: details,
                    title: title
                })
                    .then(res => {
                        console.log(res)

                        if (res.data.matchedCount > 0) {

                            toast.success('Successfully updated the task.');
                            setEditTask(false)
                        }

                    })
            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <div>
            <Modal
                show={editTask}
                size="md"
                popup={true}
                onClose={() => setEditTask(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Edit your task:
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>

                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label htmlFor="base-input" className="block my-4 text-sm font-medium text-gray-900 dark:text-white">Update Task Title</label>
                                <input defaultValue={title} {...register("title")} type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />




                            </div>
                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label className="label" htmlFor='details-input' >
                                    <span className="block my-4 text-sm font-medium text-gray-900 dark:text-white">Update your task/activites?</span>
                                </label>
                                <textarea defaultValue={details} id='details-input' rows="4" type="text" {...register("details")} className="w-full px-1 text-xl text-gray-900 bg-white  dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 border border-gray-300">

                                </textarea>


                            </div>
                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label htmlFor="task-photo" className="block my-4 text-sm font-medium text-gray-900 dark:text-white">Update Task photo...?</label>
                                <input type="file" id='task-photo' alt=' ' {...register("image")} className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                            </div>
                            <button type="submit" className="my-6 w-full py-2.5 px-4 text-lg font-bold text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 mt-4">
                                Save
                            </button>


                        </form>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default EditTaskModal;