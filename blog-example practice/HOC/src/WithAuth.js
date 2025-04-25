import React from 'react'
import { Navigate } from 'react-router-dom'
const WithAuth = (WrappedComponent ) => {
    return (props) => {
        const isAuth = localStorage.getItem("auth")
        if (!isAuth) {
            return <Navigate to="/login" />
        }
        return <WrappedComponent  {...(props || {})} />;
    }
}

export default WithAuth