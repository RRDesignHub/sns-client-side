import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../Pages/Home";
import { Teachers } from "../Pages/Teachers";
import { Management } from "../Pages/Management";
import { Result } from "../Pages/Result";

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
          path: '/result',
          element: <Result></Result>
        }
      ]
    }
  ]
)

export default router;
