import { useContext } from "react";
import { ModalTemplate } from "../ModalTemplate"
import { UserContext } from "../../contexts/userContext";

export const InvalidCredentialsModal = () => {

    const { openOrCloseInvalidCredentialsModal } = useContext(UserContext);

    return (
        <ModalTemplate title="Email ou senha estão errados" style="bg-white w-[90%] rounded-[8px] sm:w-[500px] h-[300px] flex flex-col items-center" headerStyle="w-[90%] mb-[55px] mt-[18px] text-base font-medium font-inter text-grey1" OpenOrClose={openOrCloseInvalidCredentialsModal}>
            <div className="w-[90%] flex flex-col justify-center items-center">
                <p className="text-center font-inter text-lg mt-10">O email ou a senha digitados estão errados.</p>
            </div>
        </ModalTemplate>
    )
}