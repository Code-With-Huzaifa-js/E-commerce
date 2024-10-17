import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProducts from "./components/AddProducts";
import Product from "./components/Product";
import MyProduct from "./components/Myproduct";
import { 
   createHashRouter,
   RouterProvider 
} from "react-router-dom";

function App() {
  
  const router = createHashRouter([
    {
      element:<PrivateComponent/>,
      children:[
        {
          path:'/',
          element:<><NavBar/><Product/></>
        },
        {
          path:'/myPro',
          element:<><NavBar/><MyProduct/></>
        },
        {
          path:'/add',
          element:<><NavBar/><AddProducts heading={"Add Product"}/></>
        },
        {
          path:'/logout',
          element:<NavBar/>
        },
        {
          path:'/profile',
          element:<><NavBar/></>
        },
      ]
    },
    {
      path:'/register',
      element:<><NavBar/><Register/></>
    },
    {
      path:'/login',
      element:<><NavBar/><Login/></>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
