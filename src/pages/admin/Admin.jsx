import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import SideMenu from '../../components/SideMenu/SideMenu';
import TopHeader from '../../components/TopHeader/TopHeader';
// import memoryUtils from '../../utils/memoryUtils'
export default function Admin() {
    const { Content } = Layout;
    
    return (
        
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
               <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet></Outlet>
                </Content>

            </Layout>
        </Layout>
    )
}
