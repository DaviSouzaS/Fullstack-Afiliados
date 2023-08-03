import { createContext } from "react";
import { iUserContext, iUserContextProps } from "./types";
import { iLogin, iRegister } from "../../schemas/user.schemas";
import { api } from "../../service/axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {

    const navigate: NavigateFunction = useNavigate()

    const registerUser = async (data: iRegister) => {

        try {
            const requestBody = {
                name: data.name,
                email: data.email,
                password: data.password
            }
    
            await api.post("/user", requestBody)
    
            navigate("/")        
        } catch (error) {
            console.error(error)
        }
    }

    const login = async (data: iLogin) => {
        try {
            const response = await api.post("/user/login", data)  
            
            localStorage.setItem("@INFOS", JSON.stringify(response.data))

            navigate("/dashboard")        
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <UserContext.Provider
            value={{
                registerUser,
                login
            }}
        >
            {children}
        </UserContext.Provider>
    );
};