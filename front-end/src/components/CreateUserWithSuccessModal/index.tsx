import { useContext } from "react";
import { ModalTemplate } from "../ModalTemplate"
import { UserContext } from "../../contexts/userContext";

export const CreateUserWithSuccessModal = () => {

    const { openOrCloseCreateUserWithSuccessModal } = useContext(UserContext);

    return (
        <ModalTemplate title="Conta criada com sucesso!" style="bg-white w-[90%] rounded-[8px] sm:w-[500px] h-[300px] flex flex-col items-center" headerStyle="w-[90%] mb-[55px] mt-[18px] text-base font-medium font-inter text-grey1" OpenOrClose={openOrCloseCreateUserWithSuccessModal}>
            <div className="w-[90%] flex flex-col justify-center items-center">
                <p className="text-center font-inter text-lg mt-10">Sua conta foi criada com sucesso. Agora você pode fazer login.</p>
            </div>
        </ModalTemplate>
    )
}