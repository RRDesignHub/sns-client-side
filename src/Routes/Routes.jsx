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

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/teachers',
          element: <Teachers></Teachers>
        },
        {
          path: '/management',
          element:<Management></Management>
        },
        {
          path: '/add',
          element:<AddUpdateRemoveData></AddUpdateRemoveData>,
          children:[
            {
              path: '/add/add_student',
              element: <AddStudent></AddStudent>
            },
            {
              path: '/add/students',
              element: <DisplayStudents></DisplayStudents>,
            },
            {
              path: '/add/add_result',
              element: <AddResult></AddResult>
            },
            {
              path: '/add/add_subject',
              element: <AddSubject></AddSubject>
            },
            {
              path: '/add/display_subject',
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
