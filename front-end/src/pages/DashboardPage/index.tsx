import { useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { api } from "../../service/axios"
import { AxiosError } from "axios"

export const DashboardPage = () => {

    const navigate: NavigateFunction = useNavigate()

    const userInfosString = localStorage.getItem("@INFOS") || ""

    useEffect(() => {
        if (userInfosString.length === 0 || !userInfosString) {
            localStorage.clear()
            navigate("/")

            return
        }
       
        const userInfos = JSON.parse(userInfosString)

        const token = userInfos.token

        if (!token) {
            localStorage.clear()
            navigate("/")

            return
        }

        const ensureTokenIsValid = async () => {
            try {
                await api.get("/transactions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {

                if (error instanceof AxiosError && error.response!.status === 401) {
                    localStorage.clear()
                    navigate("/")
                }
            }
        }

        ensureTokenIsValid()
    }, [navigate])

    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}