import React from 'react'
import Header from '../components/Header/HeaderContainer'
import { Outlet } from 'react-router'
function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default RootLayout
