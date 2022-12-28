import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../AddTask/AddTask";
import CompletedTask from "../../CompletedTask/CompletedTask";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import MyTask from "../../MyTask/MyTask";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import SignUp from "../../SignUp/SignUp";
import UnknownPageError from "../../UnknownPageError/UnknownPageError";



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
                path: '/my-task',
                element: <MyTask></MyTask>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/completed-task',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/*',
                element: <UnknownPageError></UnknownPageError>
            }
        ]
    },
    
])

export default router;