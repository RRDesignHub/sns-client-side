import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../Pages/Home";
import { Teachers } from "../Pages/Teachers";
import { Management } from "../Pages/Management";
import { Result } from "../Pages/Result";
import { AddUpdateRemoveData } from "../Pages/AddUpdateRemoveData";
import { AddStudent } from "../components/AddStudent";
import { AddResult } from "../components/AddResult";
import { DisplayStudents } from "../components/DisplayStudents";
import { AddSubject } from "../components/AddSubject";
import { ExistingSubjects } from "../components/ExistingSubjects";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../components/Login";
import { ErrorPage } from "../Pages/ErrorPage";

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
          path: '/login',
          element:<Login></Login>
        },
        {
          path: '/admin_access',
          element:<PrivateRoute><AddUpdateRemoveData></AddUpdateRemoveData></PrivateRoute>,
          children:[
            {
              path: '/admin_access/add_student',
              element: <AddStudent></AddStudent>
            },
            {
              path: '/admin_access/students',
              element: <DisplayStudents></DisplayStudents>,
            },
            {
              path: '/admin_access/add_result',
              element: <AddResult></AddResult>
            },
            {
              path: '/admin_access/add_subject',
              element: <AddSubject></AddSubject>
            },
            {
              path: '/admin_access/display_subject',
              element: <ExistingSubjects></ExistingSubjects>
            }
          ]
        },
        {
          path: '/result',
          element: <Result></Result>
        }
      ]
    }
  ]
)

export default router;
