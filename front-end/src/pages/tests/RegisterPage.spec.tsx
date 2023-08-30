import { render, screen } from "@testing-library/react"
import { RegisterPage } from "../RegisterPage"
import { BrowserRouter } from "react-router-dom"

describe("Register page", () => {

    it("Should render form title", () => {

        render(
        <BrowserRouter>
            <RegisterPage/>
        </BrowserRouter>)

        screen.getByText("Se registrar")
    })

    it("Should render register button", () => {
        render(
        <BrowserRouter>
            <RegisterPage/>
        </BrowserRouter>)

        screen.getByText("Criar conta")
    })
})