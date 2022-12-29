import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../AddTask/AddTask";
import CompletedTask from "../../CompletedTask/CompletedTask";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import MyTask from "../../MyTask/MyTask";
import TaskDetails from "../../MyTask/TaskDetails";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import SignUp from "../../SignUp/SignUp";
import UnknownPageError from "../../UnknownPageError/UnknownPageError";
import PrivateRoute from "../PrivateRoute/PrivateRoute";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <AddTask></AddTask>
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/my-tasks',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>,

            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/completed-tasks',
                element: <PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
            {
                path: '/*',
                element: <UnknownPageError></UnknownPageError>
            },
            {
                path: '/tasks/my-tasks/:id',
                element: <PrivateRoute><TaskDetails></TaskDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://daily-life-server-side.vercel.app/tasks/my-tasks/${params.id}`)
            }
        ]
    },

])

export default router;