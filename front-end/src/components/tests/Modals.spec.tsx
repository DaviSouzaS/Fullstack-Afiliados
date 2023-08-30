import { render } from "@testing-library/react";
import { CreateUserWithSuccessModal } from "../CreateUserWithSuccessModal";
import { EmailAlreadyExistsModal } from "../EmailAlreadyExistsModal";
import { InvalidCredentialsModal } from "../InvalidCredentialsModal";
import { TransactionFileInvalidModal } from "../TransactionFileInvalidModal";

describe("Modal components", () => {

    it("Should render modal create user with success", () => {

        const { getByText } = render(<CreateUserWithSuccessModal/>)

       expect(getByText("Sua conta foi criada com sucesso. Agora você pode fazer login.")).toBeTruthy()
    })

    it("Should render modal email already exists", () => {

        const { getByText } = render(<EmailAlreadyExistsModal/>)

       expect(getByText("O email que você tentou cadastrar já está em uso.")).toBeTruthy()
    })

    it("Should render modal invalid credentials", () => {

        const { getByText } = render(<InvalidCredentialsModal/>)

       expect(getByText("O email ou a senha digitados estão errados.")).toBeTruthy()
    })

    it("Should render modal transactions file invalid", () => {

        const { getByText } = render(<TransactionFileInvalidModal/>)

       expect(getByText("O arquivo enviado não é válido, envie um arquivo válido.")).toBeTruthy()
    })

})