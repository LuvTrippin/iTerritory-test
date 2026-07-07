import {Navigate, Outlet} from "react-router-dom";
import {useAuthStore} from "../../store/authStore.ts";
import * as React from "react";

export function ProtectedRoute() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return <Outlet/>
}

export function GuestRoute({children}: {children: React.ReactNode}) {
    const user = useAuthStore((state) => state.user);

    if (user) {
        return <Navigate to="/" replace />
    }

    return children
}
