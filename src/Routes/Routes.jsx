import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../Pages/Home";
import { Teachers } from "../Pages/Teachers";
import { Management } from "../Pages/Management";
import { Result } from "../Pages/Result";
import { PrivateRoute } from "./PrivateRoute";
import { ErrorPage } from "../Pages/ErrorPage";
import { Dashboard } from "../layouts/Dashboard";
import { SignIn } from "../Pages/AdminPages/SignIn";
import Overview from "../Pages/AdminPages/Overview";
import { AddStudent } from "../Pages/AdminPages/AddStudent";
import AllStudents from "../Pages/AdminPages/AllStudents";
import UpdateStudent from "../Pages/AdminPages/UpdateStudent";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/teachers',
          element: <Teachers></Teachers>,
        },
        {
          path: '/management',
          element:<Management></Management>
        },
        {
          path: '/result',
          element: <Result></Result>
        }
      ]
    },
    {
      path: 'login',
      element:<SignIn></SignIn>
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: "overview",
          element: <Overview></Overview>
        },
        {
          path: "add-student",
          element: <AddStudent></AddStudent>
        },
        {
          path: "students",
          element: <AllStudents></AllStudents>
        },
        {
          path: "update-student/:id",
          element: <UpdateStudent></UpdateStudent>
        },
      ]
    }
  ]
)

export default router;
