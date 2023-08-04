import { useContext } from "react";
import { ModalTemplate } from "../ModalTemplate"
import { UserContext } from "../../contexts/userContext";

export const RegisterTransactionsWithSuccessModal = () => {

    const { openOrCloseTransactionsWithSuccessModal } = useContext(UserContext);

    return (
        <ModalTemplate title="Transações registradas com sucesso!" style="bg-white w-[90%] rounded-[8px] sm:w-[500px] h-[300px] flex flex-col items-center" headerStyle="w-[90%] mb-[55px] mt-[18px] text-base font-medium font-inter text-grey1" OpenOrClose={openOrCloseTransactionsWithSuccessModal}>
            <div className="w-[90%] flex flex-col justify-center items-center">
                <p className="text-center font-inter text-lg mt-10">Todas as transações foram registradas com sucesso.</p>
            </div>
        </ModalTemplate>
    )
}