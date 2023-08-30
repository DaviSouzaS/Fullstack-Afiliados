import { render, screen } from "@testing-library/react"
import { LoginPage } from "../LoginPage"
import { BrowserRouter } from "react-router-dom"

describe("Login Page", () => {

    it("Should render form title", () => {

        render(
        <BrowserRouter>
            <LoginPage/>
        </BrowserRouter>
        )

        screen.getByText("Fazer login")
    })

    it("Should render login button", () => {

        render(
        <BrowserRouter>
            <LoginPage/>
        </BrowserRouter>
        )

        screen.getByText("Entrar")
    })
})