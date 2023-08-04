import { useContext } from "react";
import { ModalTemplate } from "../ModalTemplate"
import { UserContext } from "../../contexts/userContext";

export const EmailAlreadyExistsModal = () => {

    const { openOrCloseEmailAlreadyExistsModal } = useContext(UserContext);

    return (
        <ModalTemplate title="Email já em uso" style="bg-white w-[90%] rounded-[8px] sm:w-[500px] h-[300px] flex flex-col items-center" headerStyle="w-[90%] mb-[55px] mt-[18px] text-base font-medium font-inter text-grey1" OpenOrClose={openOrCloseEmailAlreadyExistsModal}>
            <div className="w-[90%] flex flex-col justify-center items-center">
                <p className="text-center font-inter text-lg mt-10">O email que você tentou cadastrar já está em uso.</p>
            </div>
        </ModalTemplate>
    )
}