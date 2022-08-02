import React from 'react'
import { Navigate } from "react-router-dom";
import Admin from '../../pages/admin/Admin'

export default function Ifadmin() {
    return (
        <>
            {
                localStorage.getItem("user") ?
                    <Admin /> :
                    <Navigate to="/login"></Navigate>
            }
        </>
    )
}
