import { createContext } from "react";
import { iUserContext, iUserContextProps } from "./types";
import { iLogin, iRegister } from "../../schemas/user.schemas";

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {

    const registerUser = (data: iRegister) => {
        console.log(data)
    }

    const login = (data: iLogin) => {
        console.log(data)
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