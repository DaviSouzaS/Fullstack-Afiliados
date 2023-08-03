import { createContext, useState } from "react";
import { iUserContext, iUserContextProps } from "./types";
import { iLogin, iRegister } from "../../schemas/user.schemas";
import { api } from "../../service/axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {

    const navigate: NavigateFunction = useNavigate()
    
    const [emailAlreadyExistsModal, setEmailAlreadyExistsModal] = useState(false);
    const [invalidCredentialsModal, setInvalidCredentialsModal] = useState(false);

    const openOrCloseInvalidCredentialsModal = () => {
        setInvalidCredentialsModal(!invalidCredentialsModal);
    };

    const openOrCloseEmailAlreadyExistsModal = () => {
        setEmailAlreadyExistsModal(!emailAlreadyExistsModal);
    };

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
            if (error instanceof AxiosError && error.response!.status === 409) {
                openOrCloseEmailAlreadyExistsModal()
            }
        }
    }

    const login = async (data: iLogin) => {
        try {
            const response = await api.post("/user/login", data)  
            
            localStorage.setItem("@INFOS", JSON.stringify(response.data))

            navigate("/dashboard")        
        } catch (error) {
            console.error(error)
            if (error instanceof AxiosError && error.response!.status === 401) {
                openOrCloseInvalidCredentialsModal()
            }
        }
    }
    
    return (
        <UserContext.Provider
            value={{
                registerUser,
                login,
                openOrCloseEmailAlreadyExistsModal,
                emailAlreadyExistsModal,
                openOrCloseInvalidCredentialsModal,
                invalidCredentialsModal
            }}
        >
            {children}
        </UserContext.Provider>
    );
};