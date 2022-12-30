import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Pages/Routes/Routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div className='container mx-auto'>
      <RouterProvider router={router}></RouterProvider>
     
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" ></ToastContainer>
    </div>
  );
}

export default App;
