import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
const menuList = [{
    key: 'home',
    icon: <UserOutlined />,
    label: '首页',
},
{
    key: 'shop',
    icon: <VideoCameraOutlined />,
    label: '商品',
    children: [
        {
            key: 'category',
            icon: <VideoCameraOutlined />,
            label: '品类管理',
        },
        {
            key: 'product',
            icon: <VideoCameraOutlined />,
            label: '商品管理',
        }
    ]
},
{
    key: 'user',
    icon: <UploadOutlined />,
    label: '用户管理',
},
{
    key: 'role',
    icon: <UploadOutlined />,
    label: '角色管理',

},
{
    key: 'charts',
    icon: <UploadOutlined />,
    label: '图形图标',
    children: [
        {
            key: 'charts/bar',
            icon: <UploadOutlined />,
            label: 'bar'
        },
        {
            key: 'charts/pie',
            icon: <UploadOutlined />,
            label: 'pie'
        },
        {
            key: 'charts/line',
            icon: <UploadOutlined />,
            label: 'line'
        }
    ]
},

]
export default menuList