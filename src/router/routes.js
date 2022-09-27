import { Navigate } from 'react-router-dom';
import Ifadmin from '../components/ifadmin/Ifadmin';
import Page404 from '../components/Page404';
import Category from '../pages/category/Category';
import Bar from '../pages/charts/Bar';
import Line from '../pages/charts/Line';
import Pie from '../pages/charts/Pie';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Detail from '../pages/product/Detail';
import Product from '../pages/product/Product';
import ProductAddupdate from '../pages/product/ProductAddupdate';
import ProductHome from '../pages/product/ProductHome';
import Role from '../pages/role/Role';
import User from '../pages/user/User';
const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Ifadmin />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'category',
        element: <Category />,
      },
      {
        path: 'product',
        element: <Product />,
        children: [
          {
            path: 'home',
            element: <ProductHome />,
          },
          {
            path: 'addupdate',
            element: <ProductAddupdate />,
          },
          {
            path: 'detail',
            element: <Detail />,
          },
        ],
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'role',
        element: <Role />,
      },
      {
        path: 'charts/bar',
        element: <Bar />,
      },
      {
        path: 'charts/pie',
        element: <Pie />,
      },
      {
        path: 'charts/line',
        element: <Line />,
      },
      {
        path: '/',
        element: <Navigate to="/home"></Navigate>,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];
export default routes;
