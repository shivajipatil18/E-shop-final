import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import User, { Loader as userLoader } from "./pages/User";
// import UserDetail from "./pages/UserDetail";
import AppLayout from "./pages/AppLayout";
import { getAllUsers } from "./Services/apiUsers";
import UserDetail,{loader as getuserDetail} from "./pages/UserDetail";
import Error from "./Components/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement:<Error/>,
    children: [
      { path: "home", element: <Home /> },
      { path: "/user", element: <User />, loader: getAllUsers },
      { path: "/user/:id", element: <UserDetail />,  loader: getuserDetail},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
