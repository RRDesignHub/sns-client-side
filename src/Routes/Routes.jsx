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
import { AddSubject } from "../Pages/AdminPages/AddSubject";
import AllSubjects from "../Pages/AdminPages/AllSubjects";
import { AddResult } from "../Pages/AdminPages/AddResult";
import Results from "../Pages/AdminPages/Results";
import ResultDetails from "../Pages/AdminPages/ResultDetails";
import AddNotice from "../Pages/AdminPages/AddNotice";
import { Notices } from "../Pages/Notices";
import Students from "../Pages/Students";
import CreateAdmitCard from "../Pages/AdminPages/CreateAdmitCard";

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
          path: '/all-notice',
          element: <Notices />,
        },
        {
          path: '/teachers',
          element: <Teachers></Teachers>,
        },
        {
          path: '/students',
          element: <Students />,
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
          path: "add-notice",
          element: <AddNotice />
        },
        {
          path: "students",
          element: <AllStudents></AllStudents>
        },
        {
          path: "update-student/:id",
          element: <UpdateStudent></UpdateStudent>
        },
        {
          path: "add-subjects",
          element: <AddSubject></AddSubject>
        },
        {
          path: "add-admit-card",
          element: <CreateAdmitCard />
        },
        {
          path: "subjects",
          element: <AllSubjects></AllSubjects>
        },
        {
          path: "add-result",
          element: <AddResult></AddResult>
        },
        {
          path: "results",
          element: <Results></Results>
        },
        {
          path: "result/:id",
          element: <ResultDetails></ResultDetails>
        },
      
      ]
    }
  ]
)

export default router;
