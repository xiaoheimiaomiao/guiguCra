import { Navigate } from "react-router-dom";
import Ifadmin from "../components/ifadmin/Ifadmin"
import Category from "../pages/category/Category"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Product from "../pages/product/Product"
import User from "../pages/user/User"
import Role from "../pages/role/Role"
import Bar from "../pages/charts/Bar"
import Pie from "../pages/charts/Pie"
import Line from "../pages/charts/Line"
import Page404 from "../components/Page404"
const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Ifadmin />,
        children: [
            {
                path: 'home',
                element: <Home/>,
            },
            {
                path: 'category',
                element: <Category/>
            },
            {
                path: 'product',
                element: <Product/>
            },
            {
                path: 'user',
                element: <User/>
            },
            {
                path: 'role',
                element: <Role/>,
            },
            {
                path: 'charts/bar',
                element: <Bar/>,
            },
            {
                path: 'charts/pie',
                element: <Pie/>,
            },
            {
                path: 'charts/line',
                element: <Line/>,
            },
            {
                path: '/',
                element: <Navigate to="/home"></Navigate>
            },
            {
                path: '*',
                element:<Page404/>
            }
        ]
    }
]
export default routes