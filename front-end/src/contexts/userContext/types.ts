import { iLogin, iRegister } from "../../schemas/user.schemas";

export interface iUserContext {
    login: (data: iLogin) => void
    registerUser: (data: iRegister) => void
    openOrCloseEmailAlreadyExistsModal: () => void
    emailAlreadyExistsModal: boolean
    openOrCloseInvalidCredentialsModal: () => void
    invalidCredentialsModal: boolean
    openOrCloseCreateUserWithSuccessModal: () => void
    createUserWithSuccessModal: boolean
    openOrCloseTransactionsWithSuccessModal: () => void
    registerTransactionsWithSuccessModal: boolean
    openOrCloseTransactionFileInvalidModal: () => void
    transactionFileInvalidModal: boolean
}

export interface iUserContextProps {
    children: React.ReactNode
}

