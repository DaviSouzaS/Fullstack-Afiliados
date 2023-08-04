import { useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

export const AutoLogin = () => {

    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        const userInfosString = localStorage.getItem("@INFOS") || ""

        if (userInfosString.length !== 0) {
            navigate("/dashboard")
        }
    }, [navigate])

    return (
        <></>
    )
}