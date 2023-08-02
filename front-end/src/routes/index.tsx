import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";

export const MainRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} />

            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    )
}