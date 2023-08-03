import { FiLogOut } from "react-icons/fi"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { iLoginReturn } from "../../schemas/user.schemas"

export const Header = () => {

    const navigate: NavigateFunction = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    const userInfosString: string | null = localStorage.getItem("@INFOS")

    if (!userInfosString) {
        localStorage.clear()
        navigate("/")

        return
    }

    const userInfos: iLoginReturn = JSON.parse(userInfosString)

    console.log(userInfos)
    return (
        <header className="w-full bg-brand1 h-[60px] flex justify-center">
            <div className="flex justify-between items-center h-full max-w-[1200px] min-w-[90%]">
                <p className="font-inter text-white text-lg font-medium">Fullstack Afiliados</p>
                <div className="flex gap-5 items-center">
                    <p className="font-inter text-white">Olá, </p>

                    <button onClick={logout}>
                        <FiLogOut color={"white"} size={30}/>
                    </button>
                </div>
            </div>
        </header>
    )
}