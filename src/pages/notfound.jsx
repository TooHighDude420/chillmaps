import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router"

import databaseCallList from "../api";

function NotFound() {
    const navigate = useNavigate()

    if (!databaseCallList.getLoggedIn()) {
        return navigate('/login');
    } else {
        return (
            <div className="h-[80vh] w-full flex flex-col justify-center items-center">
                <h1 className="text-4xl text-gray-500">404</h1>
                <p className="text-2xl">not found</p>
            </div>
        )
    }

}

export default NotFound